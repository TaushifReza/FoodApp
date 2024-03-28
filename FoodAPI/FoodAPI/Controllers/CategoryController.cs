using System.Net;
using AutoMapper;
using FoodAPI.DataAccess.Repository.IRepository;
using FoodAPI.Models.Models;
using FoodAPI.Models.Models.Dto;
using FoodAPI.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;

namespace FoodAPI.Controllers
{
    [Route("api/Category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        protected APIResponse _response;
        private readonly ICategoryRepository _dbCategory;
        private readonly ISellerProfileRepository _dbSellerProfile;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryRepository dbCategory,ISellerProfileRepository dbSellerProfile, IMapper mapper)
        {
            _dbCategory = dbCategory;
            _dbSellerProfile = dbSellerProfile;
            _mapper = mapper;
            this._response = new();
        }

        [HttpGet(Name = "GetAllCategory")]
        [Authorize(Roles = $"{SD.Role_IndividualSeller}, {SD.Role_RestaurantSeller}")]
        public async Task<ActionResult<APIResponse>> GetAllCategory()
        {
            try
            {
                // Retrieve user claims from the JWT token
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
                var sellerProfile = await _dbSellerProfile.GetAsync(u => u.ApplicationUserId == userId);
                var categoryExist = await _dbCategory.GetAllAsync(u=>u.SellerProfileId == sellerProfile.Id);
                if (categoryExist.Count == 0)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessage = new List<string> { "You have not add any category!!!" };
                    return BadRequest(_response);
                }

                _response.Result = _mapper.Map<List<CategoryDTO>>(categoryExist);
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                return Ok(_response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.ToString() };
            }
            return _response;
        }

        [HttpGet("{id:int}", Name = "GetCategory")]
        [Authorize(Roles = $"{SD.Role_IndividualSeller}, {SD.Role_RestaurantSeller}")]
        public async Task<ActionResult<APIResponse>> GetCategory(int id)
        {
            try
            {
                if (id == 0)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessage = new List<string> { "Category not found!!!" };
                    return BadRequest(_response);
                }

                // Retrieve user claims from the JWT token
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
                var sellerProfile = await _dbSellerProfile.GetAsync(u => u.ApplicationUserId == userId);
                var categoryExist = await _dbCategory.GetAsync(u => u.Id == id && u.SellerProfileId == sellerProfile.Id);
                if (categoryExist == null)
                {
                    return NotFound();
                }

                _response.Result = _mapper.Map<CategoryDTO>(categoryExist);
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                return Ok(_response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.ToString() };
            }
            return _response;
        }

        [HttpPost]
        [Authorize(Roles = $"{SD.Role_IndividualSeller}, {SD.Role_RestaurantSeller}")]
        public async Task<ActionResult<APIResponse>> CreateCategory([FromBody] CategoryCreateDTO createDTO)
        {
            try
            {
                if (createDTO == null)
                {
                    return BadRequest();
                }
                // Retrieve user claims from the JWT token
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
                var sellerProfile = await _dbSellerProfile.GetAsync(u => u.ApplicationUserId == userId);
                var categoryExist = await _dbCategory.GetAsync(u => u.CategoryName.ToLower() == createDTO.CategoryName.ToLower() && u.SellerProfileId == sellerProfile.Id);
                if (categoryExist != null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessage = new List<string> { "Category with this name already exist!!!"};
                    return BadRequest(_response);
                }

                createDTO.SellerProfileId = sellerProfile.Id;
                Category category = _mapper.Map<Category>(createDTO);
                await _dbCategory.CreateAsync(category);
                _response.Result = category;
                _response.StatusCode = HttpStatusCode.Created;
                _response.IsSuccess = true;
                return Ok(_response);
            }
            catch (Exception re)
            {
                Console.WriteLine(re);
                throw;
            }

            return _response;
        }
    }
}
