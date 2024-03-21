using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using YetaiEatsAPI.Context;
using YetaiEatsAPI.DTOs;
using YetaiEatsAPI.Interfaces;
using YetaiEatsAPI.Models;

namespace YetaiEatsAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly JwtContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(JwtContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public UserDTO Register(UserDTO userDTO, string signUpType)
        {
            // Check if the username or email already exists
            if (_context.Users.Any(u => u.Username == userDTO.Username || u.Email == userDTO.Email))
            {
                throw new Exception("Username or email already exists.");
            }

            var user = new User
            {
                Username = userDTO.Username,
                Password = userDTO.Password,
                Email = userDTO.Email,
                Phonenumber = userDTO.Phonenumber
            };

            var addedUser = _context.Users.Add(user);
            _context.SaveChanges();

            // Assign role to user based on signup type
            string role = GetRoleFromSignUpType(signUpType); // Implement this method
            AssignUserRole(addedUser.Entity.UserId, role);

            return new UserDTO
            {
                Username = addedUser.Entity.Username,
                Password = addedUser.Entity.Password,
                Email = addedUser.Entity.Email,
                Phonenumber = addedUser.Entity.Phonenumber
            };
        }
        private string GetRoleFromSignUpType(string signUpType)
        {
            switch (signUpType)
            {
                case "BuyerSignUp":
                    return "Customer";
                case "BusinessSignUp":
                    return "Seller";
                case "IndividualSignUp":
                    return "Individual Seller";
                case "DeliveryRiderSignUp":
                    return "Delivery Rider";
                default:
                    return "Customer"; // Default role
            }
        }


        private void AssignUserRole(int userId, string roleName)
        {
            // Find the role by name
            var role = _context.Roles.FirstOrDefault(r => r.Rolename == roleName);
            if (role == null)
            {
                throw new Exception($"Role '{roleName}' not found.");
            }

            // Create UserRole entity
            var userRole = new UserRole
            {
                UserId = userId,
                RoleId = role.RoleId
            };

            // Add UserRole to database
            _context.UserRoles.Add(userRole);
            _context.SaveChanges();
        }

        public string Login(LoginRequest loginRequest)
        {
            if (loginRequest.Username != null && loginRequest.Password != null)
            {
                var user = _context.Users.SingleOrDefault(s =>
                    (s.Username == loginRequest.Username && s.Password == loginRequest.Password));

                if (user != null)
                {
                    var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim("Id", user.UserId.ToString()),
                    new Claim("UserName", user.Username)
                };

                    var userRoles = _context.UserRoles.Where(u => u.UserId == user.UserId).ToList();
                    var roleIds = userRoles.Select(s => s.RoleId).ToList();
                    var roles = _context.Roles.Where(r => roleIds.Contains(r.RoleId)).ToList();
                    foreach (var role in roles)
                    {
                        claims.Add(new Claim(ClaimTypes.Role, role.Rolename));
                    }

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn);

                    var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
                    return jwtToken;
                }
                else
                {
                    throw new Exception("Invalid username/email or password.");
                }
            }
            else
            {
                throw new Exception("Username/email and password are required.");
            }
        }

    public Role AddRole(Role role)
        {
            var addedRole = _context.Roles.Add(role);
            _context.SaveChanges();
            return addedRole.Entity;
        }

        public bool AssignRoleToUser(AddUserRole obj)
        {
            try
            {
                var addRoles = new List<UserRole>();
                var user = _context.Users.SingleOrDefault(s => s.UserId == obj.UserId);
                if (user == null)
                {
                    throw new Exception("User is not valid");
                }
                foreach (var role in obj.RoleIds)
                {
                    var userRole = new UserRole();
                    userRole.RoleId = role;
                    userRole.UserId = user.UserId;
                    addRoles.Add(userRole);
                }
                _context.UserRoles.AddRange(addRoles);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
