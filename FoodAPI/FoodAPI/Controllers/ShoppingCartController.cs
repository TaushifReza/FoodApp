using AutoMapper;
using FoodAPI.DataAccess.Repository.IRepository;
using FoodAPI.Models.Models;
using FoodAPI.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using FoodAPI.Models.Models.Dto;
using System.Net;

namespace FoodAPI.Controllers
{
    [Route("api/ShoppingCart")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {
        protected APIResponse _response;
        private readonly IShoppingCartRepository _dbCart;
        private readonly IFoodItemRepository _dbFoodItem;
        private readonly IMapper _mapper;
        public ShoppingCartController(IShoppingCartRepository dbCart, IFoodItemRepository dbFoodItem, IMapper mapper)
        {
            _dbCart = dbCart;
            _dbFoodItem = dbFoodItem;
            _mapper = mapper;
            this._response = new();
        }

        [HttpGet(Name = "GetAllCartItem")]
        [Authorize(Roles = SD.RoleCustomer)]
        public async Task<ActionResult<APIResponse>> GetAllCartItem()
        {
            try
            {
                // Retrieve user claims from the JWT token
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var shoppingCart = await _dbCart.GetAllAsync(u => u.ApplicationUserId == userId);

                foreach (var i in shoppingCart)
                {
                    i.FoodItem = await _dbFoodItem.GetAsync(u => u.Id == i.FoodItemId);
                    i.Price = i.Count * i.FoodItem.FoodPrice;
                }

                _response.Result = _mapper.Map<List<ShoppingCartDTO>>(shoppingCart);
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

        [HttpPost(Name = "AddToCart")]
        [Authorize(Roles = SD.RoleCustomer)]
        public async Task<ActionResult<APIResponse>> AddToCart([FromBody] ShoppingCartAddDTO cartAddDto)
        {
            try
            {
                // Retrieve user claims from the JWT token
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                cartAddDto.ApplicationUserId = userId;

                ShoppingCart foodItemExist = await _dbCart.GetAsync(u =>
                    u.ApplicationUserId == userId && u.FoodItemId == cartAddDto.FoodItemId);
                if (foodItemExist != null)
                {
                    // shopping Cart exist
                    foodItemExist.Count += cartAddDto.Count;
                    await _dbCart.UpdateAsync(foodItemExist);

                    _response.Result = foodItemExist;
                    _response.StatusCode = HttpStatusCode.Created;
                    _response.IsSuccess = true;
                    return Ok(_response);
                }
                else
                {
                    // add cart record
                    ShoppingCart shoppingCart = _mapper.Map<ShoppingCart>(cartAddDto);
                    await _dbCart.CreateAsync(shoppingCart);

                    _response.Result = shoppingCart;
                    _response.StatusCode = HttpStatusCode.Created;
                    _response.IsSuccess = true;
                    return Ok(_response);
                }
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string?>() { e.ToString() };
            }
            return _response;
        }

        [HttpPut("IncreaseCartItem")]
        [Authorize(Roles = SD.RoleCustomer)]
        public async Task<ActionResult<APIResponse>> IncreaseCartItem(int cartId)
        {
            try
            {
                if (cartId == 0)
                {
                    _response.Result = "Cart Id cannot be zero!!!";
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = true;
                    return BadRequest(_response);
                }
                var cartFromDb = await _dbCart.GetAsync(u => u.Id == cartId);
                if (cartFromDb == null)
                {
                    _response.Result = "Invalid cart Id!!!";
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = true;
                    return BadRequest(_response);
                }
                cartFromDb.Count += 1;
                ShoppingCart cart = _mapper.Map<ShoppingCart>(cartFromDb);
                await _dbCart.UpdateAsync(cart);

                _response.Result = cart;
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

        [HttpPut("DecreaseCartItem")]
        [Authorize(Roles = SD.RoleCustomer)]
        public async Task<ActionResult<APIResponse>> DecreaseCartItem(int cartId)
        {
            try
            {
                if (cartId == 0)
                {
                    _response.Result = "Cart Id cannot be zero!!!";
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = true;
                    return BadRequest(_response);
                }
                var cartFromDb = await _dbCart.GetAsync(u => u.Id == cartId);
                if (cartFromDb == null)
                {
                    _response.Result = "Invalid cart Id!!!";
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = true;
                    return BadRequest(_response);
                }

                if (cartFromDb.Count <= 1)
                {
                    // Removed from cart
                    await _dbCart.RemoveAsync(cartFromDb);

                    _response.Result = "Cart Removed";
                    _response.StatusCode = HttpStatusCode.NoContent;
                    _response.IsSuccess = true;
                    return Ok(_response);
                }
                else
                {
                    // Decrease
                    cartFromDb.Count -= 1;
                    ShoppingCart cart = _mapper.Map<ShoppingCart>(cartFromDb);
                    await _dbCart.UpdateAsync(cart);

                    _response.Result = cart;
                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = true;
                    return Ok(_response);
                }
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string?>() { e.ToString() };
            }
            return _response;
        }

        [HttpDelete("{id:int}", Name = "RemoveCartItem")]
        [Authorize(Roles = SD.RoleCustomer)]
        public async Task<ActionResult<APIResponse>> RemoveCartItem(int id)
        {
            try
            {
                if (id == 0)
                {
                    _response.Result = "Cart Id cannot be zero!!!";
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = true;
                    return BadRequest(_response);
                }
                var cartFromDb = await _dbCart.GetAsync(u => u.Id == id);
                if (cartFromDb == null)
                {
                    _response.Result = "Invalid cart Id!!!";
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = true;
                    return BadRequest(_response);
                }
                ShoppingCart cart = _mapper.Map<ShoppingCart>(cartFromDb);
                await _dbCart.RemoveAsync(cart);

                _response.Result = "Cart Removed";
                _response.StatusCode = HttpStatusCode.NoContent;
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
