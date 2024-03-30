using FoodAPI.DataAccess.Repository.IRepository;
using FoodAPI.Models.Models;
using FoodAPI.Models.Models.Dto;
using FoodAPI.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;
using AutoMapper;

namespace FoodAPI.Controllers
{
    [Route("api/FoodItem")]
    [ApiController]
    public class FoodItemController : ControllerBase
    {
        private readonly APIResponse _response;
        private readonly ISellerProfileRepository _dbSellerProfile;
        private readonly IFoodItemRepository _dbFoodItem;
        private readonly ICategoryRepository _dbCategory;
        private readonly IMapper _mapper;


        public FoodItemController(ISellerProfileRepository dbSellerProfile, IFoodItemRepository dbFoodItem, ICategoryRepository dbCategory, IMapper mapper)
        {
            _dbSellerProfile = dbSellerProfile;
            _dbFoodItem = dbFoodItem;
            _dbCategory = dbCategory;
            _mapper = mapper;
            this._response = new ();
        }

        [HttpGet("{id:int}", Name = "GetFoodItem")]
        [Authorize(Roles = $"{SD.Role_IndividualSeller}, {SD.Role_RestaurantSeller}")]
        public async Task<ActionResult<APIResponse>> GetFoodItem(int id)
        {
            // Retrieve user claims from the JWT token
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var sellerProfile = await _dbSellerProfile.GetAsync(u => u.ApplicationUserId == userId);
            if (sellerProfile == null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessage = new List<string> { "Seller Profile not create!!!" };
                return BadRequest(_response);
            }
            var foodItem = await _dbFoodItem.GetAsync(u=>u.Id==id);
            if (foodItem == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessage = new List<string> { "Food Not Found!!!" };
                return BadRequest(_response);
            }

            _response.Result = _mapper.Map<FoodItemDTO>(foodItem);
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            return Ok(_response);
        }

        [HttpGet(Name = "GetAllFoodItem")]
        [Authorize(Roles = $"{SD.Role_IndividualSeller}, {SD.Role_RestaurantSeller}")]
        public async Task<ActionResult<APIResponse>> GetAllFoodItem()
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var sellerProfile = await _dbSellerProfile.GetAsync(u => u.ApplicationUserId == userId);
            if (sellerProfile == null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessage = new List<string> { "Seller Profile not create!!!" };
                return BadRequest(_response);
            }
            var foodItem = await _dbFoodItem.GetAllAsync(u => u.SellerProfileId == sellerProfile.Id);
            if (foodItem.Count == 0)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessage = new List<string> { "You don't have add any Food Item!!!" };
                return BadRequest(_response);
            }
            _response.Result = _mapper.Map<List<FoodItemDTO>>(foodItem);
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            return Ok(_response);
        }


        [HttpPost]
        [Authorize(Roles = $"{SD.Role_IndividualSeller}, {SD.Role_RestaurantSeller}")]
        public async Task<ActionResult<APIResponse>> FileUpload(FoodItemCreateDTO createFoodItemDTO)
        {
            try
            {
                if (createFoodItemDTO == null)
                {
                    return BadRequest();
                }
                // Retrieve user claims from the JWT token
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                var sellerProfile = await _dbSellerProfile.GetAsync(u => u.ApplicationUserId == userId);
                if (sellerProfile == null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessage = new List<string> { "Seller Profile not create!!!" };
                    return BadRequest(_response);
                }

                var foodItemExist =
                    await _dbFoodItem.GetAsync(u => u.FoodName.ToLower() == createFoodItemDTO.FoodName.ToLower());
                if (foodItemExist != null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessage = new List<string> { "Food Item with this name already exist!!!" };
                    return BadRequest(_response);
                }
                var categoryExist = await _dbCategory.GetAsync(u => u.Id==createFoodItemDTO.CategoryId);
                if (categoryExist == null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessage = new List<string> { "Category don't exist exist!!!" };
                    return BadRequest(_response);
                }
                createFoodItemDTO.SellerProfileId = sellerProfile.Id;

                // Logic to save image and get image url
                //createFoodItemDTO.FoodImage.

                Random random = new Random();
                int randomNumber = random.Next(1, 6);

                if (randomNumber == 1)
                {
                    createFoodItemDTO.ImageUrl = SD.Image1;
                }else if (randomNumber == 2)
                {
                    createFoodItemDTO.ImageUrl = SD.Image2;
                }else if (randomNumber == 3)
                {
                    createFoodItemDTO.ImageUrl = SD.Image3;
                }else if (randomNumber == 4)
                {
                    createFoodItemDTO.ImageUrl = SD.Image4;
                }else if (randomNumber == 5)
                {
                    createFoodItemDTO.ImageUrl = SD.Image5;
                }else
                {
                    createFoodItemDTO.ImageUrl = SD.Image3;
                }

                FoodItem foodItem = _mapper.Map<FoodItem>(createFoodItemDTO);
                await _dbFoodItem.CreateAsync(foodItem);
                _response.Result = foodItem;
                _response.StatusCode = HttpStatusCode.Created;
                _response.IsSuccess = true;
                return Ok(_response);
            }
            catch (Exception e)
            {
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.IsSuccess = false;
                _response.ErrorMessage = new List<string>() { e.ToString() };
            }
            return _response;
        }
    }
}
