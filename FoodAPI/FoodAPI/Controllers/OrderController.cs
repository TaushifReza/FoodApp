using System.Diagnostics;
using System.Net;
using AutoMapper;
using FoodAPI.DataAccess.Repository.IRepository;
using FoodAPI.Models.Models;
using FoodAPI.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using FoodAPI.Models.Models.Dto;
using Microsoft.AspNetCore.Identity;
using Stripe.Checkout;

namespace FoodAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        protected APIResponse _response;
        private readonly IOrderHeaderRepository _dbOrderHeader;
        private readonly IOrderDetailRepository _dbOrderDetail;
        private readonly IShoppingCartRepository _dbCart;
        private readonly IFoodItemRepository _dbFoodItem;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public OrderController(IOrderHeaderRepository dbOrderHeader, IOrderDetailRepository dbOrderDetail,  IMapper mapper, IShoppingCartRepository dbCart, IFoodItemRepository dbFoodItem, UserManager<ApplicationUser> userManager)
        {
            _dbOrderHeader = dbOrderHeader;
            _dbOrderDetail = dbOrderDetail;
            _mapper = mapper;
            this._response = new();
            _dbCart = dbCart;
            _dbFoodItem = dbFoodItem;
            _userManager = userManager;
        }

        [HttpPost("PlaceOrder")]
        [Authorize(Roles = SD.RoleCustomer)]
        public async Task<ActionResult<APIResponse>> PlaceOrder()
        {
            try
            {
                // Retrieve user claims from the JWT token
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
                var shoppingCart = await _dbCart.GetAllAsync(u => u.ApplicationUserId == userId);
                var user = await _userManager.FindByIdAsync(userId);

                OrderHeaderCreateDTO order = new OrderHeaderCreateDTO
                {
                    ApplicationUserId = userId,
                    ApplicationUser = user,
                    OrderDate = DateTime.Now,
                    OrderStatus = SD.OrderStatusPending,
                    PaymentStatus = SD.PaymentStatusPending,
                    OrderTotal = 0,
                    Address = user.Address,
                    FullName = user.FullName
                };
                foreach (var cart in shoppingCart)
                {
                    cart.FoodItem = await _dbFoodItem.GetAsync(u => u.Id == cart.FoodItemId);
                    if (cart.FoodItem != null) {
                        cart.Price = cart.Count * cart.FoodItem.FoodPrice;
                        order.OrderTotal += cart.Price;
                    }
                }

                var orderHeader = _mapper.Map<OrderHeader>(order);
                await _dbOrderHeader.CreateAsync(orderHeader);

                foreach (var cart in shoppingCart) {
                    //cart.FoodItem = await _dbFoodItem.GetAsync(u => u.Id == cart.FoodItemId);
                    OrderDetail orderDetail = new() {
                        OrderHeaderId = orderHeader.Id,
                        FoodItemId = cart.FoodItem.Id,
                        Count = cart.Count,
                        Price = cart.Price
                    };
                    await _dbOrderDetail.CreateAsync(orderDetail);
                }
                // Capture Payment
                var options = new Stripe.Checkout.SessionCreateOptions {
                    //SuccessUrl = "https://example.com/success",
                    SuccessUrl = $"https://localhost:7041/api/Order/OrderConfirmation?id={orderHeader.Id}",
                    CancelUrl = "https://example.com/cancel",
                    LineItems = new List<SessionLineItemOptions>(),
                    Mode = "payment",
                };
                foreach (var cart in shoppingCart) {
                    cart.FoodItem = await _dbFoodItem.GetAsync(u => u.Id == cart.FoodItemId);
                    var sessionLineItem = new SessionLineItemOptions {
                        PriceData = new SessionLineItemPriceDataOptions {
                            UnitAmount = (long)((cart.Price / cart.Count)*100)!,
                            Currency = "npr",
                            ProductData = new SessionLineItemPriceDataProductDataOptions {
                                Images = new List<string>() { cart.FoodItem.ImageUrl },
                                Name = cart.FoodItem.FoodName
                            }
                        },
                        Quantity = cart.Count
                    };
                    options.LineItems.Add(sessionLineItem);
                }
                var service = new Stripe.Checkout.SessionService();
                Session session = await service.CreateAsync(options);
                await _dbOrderHeader.UpdateStripePaymentIDAsync(orderHeader.Id, session.Id, session.PaymentIntentId);
                //Response.Headers.Add("Location", session.Url);
                //return new StatusCodeResult(303);

                _response.Result = session.Url;
                return _response;

            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string?>() { e.ToString() };
            }
            return _response;
        }

        [HttpPost("OrderConfirmation")]
        [Authorize(Roles = SD.RoleCustomer)]
        public async Task<ActionResult<APIResponse>> OrderConfirmation(int id)
        {
            try
            {
                var orderHeader = await _dbOrderHeader.GetAsync(u=>u.Id==id);
                var service = new SessionService();
                var session = await service.GetAsync(orderHeader.SessionId);

                if (session.PaymentStatus.ToLower() == "paid") {
                    await _dbOrderHeader.UpdateStripePaymentIDAsync(id, session.Id, session.PaymentIntentId);
                    await _dbOrderHeader.UpdateStatusAsync(id, SD.OrderStatusApproved, SD.PaymentStatusApproved);
                }
                // Clear Shopping cart
                var shoppingCarts =
                    await _dbCart.GetAllAsync(u => u.ApplicationUserId == orderHeader.ApplicationUserId);
                await _dbCart.RemoveRangeAsync(shoppingCarts);

                _response.Result = "Payment Success";
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                return Ok(_response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string?>() { e.ToString() };
            }
            return _response;
        }
    }
}
