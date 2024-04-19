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
using Stripe;

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
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long?)(orderHeader.OrderTotal*100),
                    Currency = "npr",
                    AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                    {
                        Enabled = true,
                    },
                };
                var service1 = new PaymentIntentService();
                var paymentIntent = await service1.CreateAsync(options);
                await _dbOrderHeader.UpdateStripePaymentIDAsync(orderHeader.Id, "sessionId", paymentIntent.ClientSecret);


                //_response.Result = paymentIntent.ClientSecret;
                _response.Result = new
                {
                    paymentIntentId = paymentIntent.ClientSecret,
                    orderHeaderId = orderHeader.Id,
                };
                _response.IsSuccess = true;
                _response.StatusCode = HttpStatusCode.Accepted;
                return _response;

            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string?>() { e.ToString() };
            }
            return _response;
        }

        [HttpPost("CancelOrder")]
        [Authorize(Roles = SD.RoleCustomer)]
        public async Task<ActionResult<APIResponse>> CancelOrder()
        {
            try
            {
                // Retrieve user claims from the JWT token
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
                var shoppingCart = await _dbCart.GetAllAsync(u => u.ApplicationUserId == userId);
                await _dbCart.RemoveRangeAsync(shoppingCart);

                _response.Result = "Cart Item deleted";
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


        [HttpGet("OrderConfirmation")]
        [Authorize(Roles = SD.RoleCustomer)]
        public async Task<ActionResult<APIResponse>> OrderConfirmation(int id)
        {
            try
            {
                // Retrieve user claims from the JWT token
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var orderHeader = await _dbOrderHeader.GetAsync(u=>u.Id==id);
                await _dbOrderHeader.UpdateStatusAsync(id, SD.OrderStatusApproved, SD.PaymentStatusApproved);
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

        [HttpGet("GetPendingOrder")]
        //[Authorize(Roles = SD.RoleDeliveryRider)]
        public async Task<ActionResult<APIResponse>> GetPendingOrder()
        {
            try
            {
                var orderHeader = await _dbOrderHeader.GetAllAsync(u =>
                    u.OrderStatus == SD.OrderStatusApproved && u.PaymentStatus == SD.PaymentStatusApproved);

                if (orderHeader == null)
                {
                    _response.Result = "No pending Order";
                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = true;
                    return Ok(_response);
                }
                _response.Result = _mapper.Map<List<OrderHeaderDTO>>(orderHeader);
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

        [HttpGet("ShippedOrder")]
        [Authorize(Roles = SD.RoleDeliveryRider)]
        public async Task<ActionResult<APIResponse>> ShippedOrder(int id)
        {
            try
            {
                var orderHeader = await _dbOrderHeader.GetAsync(u => u.Id == id);
                if (orderHeader == null)
                {
                    _response.Result = "Order not found";
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    return Ok(_response);
                }
                orderHeader.OrderStatus = SD.OrderStatusShipped;
                await _dbOrderHeader.UpdateAsync(orderHeader);

                _response.Result = "Order has been Shipped";
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

        [HttpGet("GetAllOrder")]
        [Authorize(Roles = $"{SD.RoleRestaurantSeller}, {SD.RoleIndividualSeller}")]
        public async Task<ActionResult<APIResponse>> GetAllOrder()
        {
            var orderHeader = await _dbOrderHeader.GetAllAsync(u=>u.OrderStatus==SD.OrderStatusApproved && u.PaymentStatus==SD.PaymentStatusApproved);

            _response.Result = _mapper.Map<List<OrderHeaderDTO>>(orderHeader);
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            return Ok(_response);
        }
    }
}
