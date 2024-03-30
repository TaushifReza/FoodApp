using AutoMapper;
using FoodAPI.DataAccess.Repository.IRepository;
using FoodAPI.Models.Models;
using FoodAPI.Models.Models.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using FoodAPI.Utility;
using Microsoft.AspNetCore.Authorization;
using System.Runtime.Intrinsics.X86;
using System.Security.Claims;

namespace FoodAPI.Controllers
{
    [Route("api/SellerProfile")]
    [ApiController]
    public class SellerProfileController : ControllerBase
    {
        protected APIResponse _response;
        private readonly ISellerProfileRepository _dbSellerProfile;
        private readonly IMapper _mapper;

        public SellerProfileController(ISellerProfileRepository dbSellerProfile, IMapper mapper)
        {
            _dbSellerProfile = dbSellerProfile;
            _mapper = mapper;
            this._response = new();
        }

        [HttpGet("{id:int}", Name = "GetSellerProfile")]
        [Authorize(Roles = $"{SD.Role_IndividualSeller}, {SD.Role_RestaurantSeller}")]
        public async Task<ActionResult<APIResponse>> GetSellerProfile(int id)
        {
            try
            {
                if (id == 0)
                {
                    return BadRequest();
                }

                var sellerProfile = await _dbSellerProfile.GetAsync(u => u.Id == id);
                if (sellerProfile == null)
                {
                    return NotFound();
                }

                _response.Result = _mapper.Map<SellerProfileDTO>(sellerProfile);
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
        public async Task<ActionResult<APIResponse>> CreateSellerProfile([FromBody] SellerProfileCreateDTO createDTO)
        {
            try
            {
                if (createDTO == null)
                {
                    return BadRequest();
                }
                // Retrieve user claims from the JWT token
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
                var profileExist = await _dbSellerProfile.GetAsync(u=>u.ApplicationUserId==userId);
                if (profileExist != null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessage = new List<string> { "Seller Profile already created" };
                    _response.IsSuccess = false;
                    return Ok(_response);
                }
                // Set the ApplicationUserID property of the createDTO
                createDTO.ApplicationUserId = userId;

                SellerProfile sellerProfile = _mapper.Map<SellerProfile>(createDTO);
                
                await _dbSellerProfile.CreateAsync(sellerProfile);
                _response.Result = sellerProfile;
                _response.StatusCode = HttpStatusCode.Created;
                _response.IsSuccess = true;
                return Ok(_response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.ToString() };
            }
            return _response;
        }
    }
}
