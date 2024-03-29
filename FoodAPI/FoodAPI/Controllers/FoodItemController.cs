using FoodAPI.DataAccess.Repository.IRepository;
using FoodAPI.Models.Models;
using FoodAPI.Models.Models.Dto;
using FoodAPI.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

namespace FoodAPI.Controllers
{
    [Route("api/FoodItem")]
    [ApiController]
    public class FoodItemController : ControllerBase
    {
        private readonly APIResponse _response;
        private readonly ISellerProfileRepository _dbSellerProfile;

        public FoodItemController(ISellerProfileRepository dbSellerProfile)
        {
            _dbSellerProfile = dbSellerProfile;
            this._response = new ();
        }
        [HttpPost]
        [Authorize(Roles = $"{SD.Role_IndividualSeller}, {SD.Role_RestaurantSeller}")]
        public async Task<ActionResult<APIResponse>> FileUpload(FoodItemCreateDTO createFoodItemDTO)
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
            createFoodItemDTO.SellerProfileId = sellerProfile.Id;
            
            // Logic to save image and get image url
            //createFoodItemDTO.FoodImage.

            createFoodItemDTO.ImageUrl = "";
            return Ok("OK");
        }
    }
}
