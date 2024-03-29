using System.Net;
using FoodAPI.Models.Models;
using FoodAPI.Models.Models.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodItemController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        protected APIResponse _response;
        public IFormFile File { get; set; }

        public FoodItemController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            this._response = new();
        }

        [HttpPost]
        public async Task<ActionResult<APIResponse>> AddFoodItem(FoodItemCreateDTO addFoodItemDTO)
        {
            if (addFoodItemDTO == null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessage = new List<string> { "Invalid request" };
                return BadRequest(_response);
            }

            return Ok("OK");
        }
    }
}
