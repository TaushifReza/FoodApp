using Microsoft.AspNetCore.Mvc;
using YetaiEatsAPI.DTOs;
using YetaiEatsAPI.Interfaces;
using YetaiEatsAPI.Models;
using YetaiEatsAPI.Services;

namespace JWT_Authentication_Authorization.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _auth;

        public AuthController(IAuthService auth)
        {
            _auth = auth;
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                var token = _auth.Login(loginRequest);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Register([FromBody] UserDTO userDTO, [FromQuery] string signUpType)
        {
            try
            {
                var addedUser = _auth.Register(userDTO, signUpType); 
                return Ok(addedUser);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpPost("assignRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult AssignRoleToUser([FromBody] AddUserRole userRole)
        {
            try
            {
                var addedUserRole = _auth.AssignRoleToUser(userRole);
                return Ok(new { success = addedUserRole });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("addRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult AddRole([FromBody] Role role)
        {
            try
            {
                var addedRole = _auth.AddRole(role);
                return Ok(addedRole);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
