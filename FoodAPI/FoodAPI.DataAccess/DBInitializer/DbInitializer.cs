using FoodAPI.DataAccess.Data;
using FoodAPI.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using FoodAPI.Utility;

namespace FoodAPI.DataAccess.DBInitializer
{
    public class DbInitializer : IDbInitializer
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _db;

        public DbInitializer(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            ApplicationDbContext db)
            // ReSharper disable once ConvertToPrimaryConstructor
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _db = db;
        }
        public void Initialize()
        {
            //migrations if they are not
            try
            {
                if (_db.Database.GetPendingMigrations().Any())
                {
                    _db.Database.Migrate();
                }
            }
            catch (Exception ex)
            {

            }

            //create role if they are not created
            if (_roleManager.FindByNameAsync(SD.RoleAdmin).GetAwaiter()
                    .GetResult() is null)
            {
                _roleManager.CreateAsync(new IdentityRole(){Name = SD.RoleCustomer})
                    .GetAwaiter().GetResult();
                _roleManager.CreateAsync(new IdentityRole() {Name = SD.RoleDeliveryRider })
                    .GetAwaiter().GetResult();
                _roleManager.CreateAsync(new IdentityRole() { Name = SD.RoleIndividualSeller })
                    .GetAwaiter().GetResult();
                _roleManager.CreateAsync(new IdentityRole() { Name = SD.RoleRestaurantSeller })
                    .GetAwaiter().GetResult();

                //if role are not created, then we will create admin user as well
                _userManager.CreateAsync(new ApplicationUser
                {
                   FullName = "Admin",
                   PhoneNumber = "1234567890",
                   Email = "admin@gmail.com",
                   PasswordHash = "Admin123!",
                   UserName = "admin@gmail.com",
                   Address = "adminAddress"
                }, "Admin123!").GetAwaiter().GetResult();

                var user = _db.ApplicationUsers.FirstOrDefault(u => u.Email == "admin@gmail.com");
                _userManager.AddToRoleAsync(user, SD.RoleAdmin).GetAwaiter().GetResult();
            }

            return;
        }
    }
}
