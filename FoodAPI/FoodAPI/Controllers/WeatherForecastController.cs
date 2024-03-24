using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using FoodAPI.Models.Models;
using Microsoft.AspNetCore.Identity;

namespace FoodAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly UserManager<ApplicationUser> _userManager;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, UserManager<ApplicationUser> userManager)
        {
            _logger = logger;
            _userManager = userManager;
        }

        [Authorize(Roles = "Customer")]
        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [Authorize]
        [HttpPost(Name = "Test")]
        public ActionResult Test()
        {
            // Retrieve user claims from the JWT token
            var userEmailClaim = HttpContext.User.FindFirst(ClaimTypes.Email);

            var user = _userManager.FindByEmailAsync(userEmailClaim.Value).Result; // Since FindByEmailAsync is async, you need to await it or use .Result to get the result synchronously.

            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                // Unable to retrieve user information from token
                return BadRequest("Unable to retrieve user information from token");
            }
        }
    }
}
