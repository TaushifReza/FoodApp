using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FoodAPI.DataAccess.Data;
using FoodAPI.DataAccess.Repository.IRepository;
using FoodAPI.Models.Models;
using FoodAPI.Models.Models.Dto;
using FoodAPI.Utility;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using static FoodAPI.Models.Models.Dto.ServiceResponsesDTO;

namespace FoodAPI.DataAccess.Repository
{
    public class UserAccountRepository(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration config, ApplicationDbContext db)
        : IUserAccount
    {
        public async Task<GeneralResponse> CreateAccount(UserDTO userDTO)
        {
            if (userDTO is null) return new GeneralResponse(false, "Model is empty");
            if (userDTO.Role != SD.Role_Customer &&
                userDTO.Role != SD.Role_DeliveryRider &&
                userDTO.Role != SD.Role_Admin &&
                userDTO.Role != SD.Role_IndividualSeller &&
                userDTO.Role != SD.Role_RestaurantSeller)
            {
                return new GeneralResponse(false, "Invalid role");
            }
            var newUser = new ApplicationUser()
            {
                FullName = userDTO.FullName,
                PhoneNumber = userDTO.PhoneNumber,
                Email = userDTO.Email,
                PasswordHash = userDTO.Password,
                UserName = userDTO.Email,
                Address = userDTO.Address
            };
            var user = await userManager.FindByEmailAsync(newUser.Email);
            if (user is not null) return new GeneralResponse(false, "Email already exist!!!");

            var createUser = await userManager.CreateAsync(newUser!, userDTO.Password);
            var errorMessages = string.Join(", ", createUser.Errors.Select(error => error.Description));
            if (!createUser.Succeeded) return new GeneralResponse(false, errorMessages);

            // Create Role if Role don't exist in db
            var checkAdmin = await roleManager.FindByNameAsync(SD.Role_Admin);
            if (checkAdmin is null)
            {
                await roleManager.CreateAsync(new IdentityRole() { Name = SD.Role_Admin });
                await roleManager.CreateAsync(new IdentityRole() { Name = SD.Role_DeliveryRider });
                await roleManager.CreateAsync(new IdentityRole() { Name = SD.Role_IndividualSeller });
                await roleManager.CreateAsync(new IdentityRole() { Name = SD.Role_RestaurantSeller });
                await roleManager.CreateAsync(new IdentityRole() { Name = SD.Role_Customer });
            }
            // Assign role user
            await userManager.AddToRoleAsync(newUser, userDTO.Role);
            return new GeneralResponse(true, "Account Created");

        }

        public async Task<LoginResponse> LoginAccount(LoginDTO loginDTO)
        {
            if (loginDTO == null)
                return new LoginResponse(false, null!, "Login container is empty", null!, null!, null!);

            var getUser = await userManager.FindByEmailAsync(loginDTO.Email);
            if (getUser is null)
                return new LoginResponse(false, null!, "Invalid email/password", null!, null!, null!);

            bool checkUserPasswords = await userManager.CheckPasswordAsync(getUser, loginDTO.Password);
            if (!checkUserPasswords)
                return new LoginResponse(false, null!, "Invalid email/password", null!, null!, null!);

            var getUserRole = await userManager.GetRolesAsync(getUser);
            var userSession = new UserSessionDTO(getUser.Id, getUser.FullName, getUser.Email, getUserRole.First());
            string token = GenerateToken(userSession);
            if (getUserRole.First() == SD.Role_Admin || getUserRole.First() == SD.Role_Customer)
            {
                return new LoginResponse(true, token!, "Login completed",getUser,null,getUserRole.First());
            }

            var userProfile = db.SellerProfiles.FirstOrDefault(u => u.ApplicationUserId == getUser.Id);
            if (userProfile == null)
            {
                return new LoginResponse(true, token!, "Login completed",getUser,null,getUserRole.First());
            }
            return new LoginResponse(true, token!, "Login completed", getUser, userProfile, getUserRole.First());
        }

        private string GenerateToken(UserSessionDTO user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var userClaims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };
            var token = new JwtSecurityToken(
                issuer: config["Jwt:Issuer"],
                audience: config["Jwt:Audience"],
                claims: userClaims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
