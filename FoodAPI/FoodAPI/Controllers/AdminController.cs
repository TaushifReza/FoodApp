using AutoMapper;
using FoodAPI.DataAccess.Repository.IRepository;
using FoodAPI.Models.Models;
using FoodAPI.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using FoodAPI.Models.Models.Dto;

namespace FoodAPI.Controllers
{
    [Route("api/Admin")]
    [ApiController]
    [Authorize(Roles = SD.RoleAdmin)]
    public class AdminController : ControllerBase
    {
        protected APIResponse _response;
        private readonly IOrderHeaderRepository _dbOrderHeader;
        private readonly IOrderDetailRepository _dbOrderDetail;
        private readonly IShoppingCartRepository _dbCart;
        private readonly IFoodItemRepository _dbFoodItem;
        private readonly ISellerProfileRepository _dbSellerProfile;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ICategoryRepository _dbCategory;
        private readonly IMapper _mapper;

        public AdminController(IOrderHeaderRepository dbOrderHeader, IOrderDetailRepository dbOrderDetail, IMapper mapper, IShoppingCartRepository dbCart, IFoodItemRepository dbFoodItem, UserManager<ApplicationUser> userManager, ISellerProfileRepository dbSellerProfile, ICategoryRepository dbCategory)
        {
            _dbOrderHeader = dbOrderHeader;
            _dbOrderDetail = dbOrderDetail;
            _mapper = mapper;
            this._response = new();
            _dbCart = dbCart;
            _dbFoodItem = dbFoodItem;
            _userManager = userManager;
            _dbSellerProfile = dbSellerProfile;
            _dbCategory = dbCategory;
        }

        [HttpGet("GetAllSeller")]
        public async Task<ActionResult<APIResponse>> GetAllSeller()
        {
            try
            {
                var sellerProfile = await _dbSellerProfile.GetAllAsync();

                _response.Result = _mapper.Map<List<SellerProfileAdminDTO>>(sellerProfile);
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

        [HttpGet("GetAllSellerCategory/{id:int}")]
        public async Task<ActionResult<APIResponse>> GetAllSellerCategory(int id)
        {
            try
            {
                var category = await _dbCategory.GetAllAsync(u => u.SellerProfileId == id);

                _response.Result = _mapper.Map<List<CategoryDTO>>(category);
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

        [HttpGet("GetAllSellerFoodItem/{sellerId:int}/{categoryId:int}")]
        public async Task<ActionResult<APIResponse>> GetAllSellerFoodItem(int sellerId, int categoryId)
        {
            try
            {
                var foodItem =
                    await _dbFoodItem.GetAllAsync(u => u.SellerProfileId == sellerId && u.CategoryId == categoryId);

                _response.Result = _mapper.Map<List<FoodItemDTO>>(foodItem);
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
        public async Task<ActionResult<APIResponse>> GetAllOrder()
        {
            try
            {
                var order = await _dbOrderHeader.GetAllAsync();

                _response.Result = _mapper.Map<List<OrderHeaderDTO>>(order);
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
