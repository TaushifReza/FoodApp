using Microsoft.EntityFrameworkCore;
using YetaiEatsAPI.Models;

namespace YetaiEatsAPI.Context
{
    public class JwtContext : DbContext
    {
        public JwtContext(DbContextOptions<JwtContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<DeliveryRider> DeliveryRiders { get; set; }
        public DbSet<Seller> Sellers { get; set; }
        public DbSet<MenuItem> MenuItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed MenuItems
            modelBuilder.Entity<MenuItem>().HasData(
                new MenuItem
                {
                    Id = 1,
                    ItemName = "Burger",
                    Price = 250,
                    ItemRating = 5,
                    Image = "https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcRRto3IlY56MlAIOAvXHvPEVxBDVzG1uz1zULEBYdJ-I4Aa-xOyPEVvv7fmIjLnxaOz",
                    Time = "10 minutes",
                    SellerId = 2
                },
                new MenuItem
                {
                    Id = 2,
                    ItemName = "Pizza",
                    Price = 450,
                    ItemRating = 5,
                    Image = "https://www.recipetineats.com/wp-content/uploads/2023/05/Garlic-cheese-pizza_9.jpg",
                    Time = "15 minutes",
                    SellerId = 1
                }
            );

            modelBuilder.Entity<Seller>().HasData(
                new Seller
                {
                    SellerId = 1,
                    BusinessName = "Pizza Hub",
                    StoreRating = 4.8,
                    StoreProfile = "https://iconape.com/wp-content/files/ok/245677/png/kfc-new-logo.png",
                    UserId = 1
                },
                new Seller
                {
                    SellerId = 2,
                    BusinessName = "Burger King",
                    StoreRating = 5,
                    StoreProfile = "https://cdn.sanity.io/images/kts928pd/production/d0c90d0e0305b341ee63b98de3e751fc8f53b02a-1536x864.png",
                    UserId = 1
                }
            );

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserId = 1,
                    Username = "Aryan Dhamala",
                    Password = "test1",
                    Email = "aryandhamala8@gmail.com",
                    Phonenumber = "9819398642"
                }
            );

            modelBuilder.Entity<Role>().HasData(
               new Role
               {
                   RoleId = 1,
                   Rolename = "Admin",
               },
               new Role
               {
                   RoleId = 2,
                   Rolename = "Seller",
               },
               new Role
               {
                   RoleId = 3,
                   Rolename = "Customer",
               },
               new Role
               {
                   RoleId = 4,
                   Rolename = "Delivery Rider",
               },
               new Role
               {
                   RoleId = 5,
                   Rolename = "Individual Seller"
               }
           );
        }
    }
}
