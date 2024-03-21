﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using YetaiEatsAPI.Context;

#nullable disable

namespace YetaiEatsAPI.Migrations
{
    [DbContext(typeof(JwtContext))]
    partial class JwtContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.15")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("YetaiEatsAPI.Models.DeliveryRider", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("AvailabilityStatus")
                        .HasColumnType("bit");

                    b.Property<string>("VehicleInformation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("DeliveryRiders");
                });

            modelBuilder.Entity("YetaiEatsAPI.Models.MenuItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ItemName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("ItemRating")
                        .HasColumnType("float");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<int>("SellerId")
                        .HasColumnType("int");

                    b.Property<string>("Time")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("SellerId");

                    b.ToTable("MenuItems");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Image = "https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcRRto3IlY56MlAIOAvXHvPEVxBDVzG1uz1zULEBYdJ-I4Aa-xOyPEVvv7fmIjLnxaOz",
                            ItemName = "Burger",
                            ItemRating = 5.0,
                            Price = 250.0,
                            SellerId = 2,
                            Time = "10 minutes"
                        },
                        new
                        {
                            Id = 2,
                            Image = "https://www.recipetineats.com/wp-content/uploads/2023/05/Garlic-cheese-pizza_9.jpg",
                            ItemName = "Pizza",
                            ItemRating = 5.0,
                            Price = 450.0,
                            SellerId = 1,
                            Time = "15 minutes"
                        });
                });

            modelBuilder.Entity("YetaiEatsAPI.Models.Role", b =>
                {
                    b.Property<int>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RoleId"));

                    b.Property<string>("Rolename")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RoleId");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            RoleId = 1,
                            Rolename = "Admin"
                        },
                        new
                        {
                            RoleId = 2,
                            Rolename = "Seller"
                        },
                        new
                        {
                            RoleId = 3,
                            Rolename = "Customer"
                        },
                        new
                        {
                            RoleId = 4,
                            Rolename = "Delivery Rider"
                        },
                        new
                        {
                            RoleId = 5,
                            Rolename = "Individual Seller"
                        });
                });

            modelBuilder.Entity("YetaiEatsAPI.Models.Seller", b =>
                {
                    b.Property<int>("SellerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SellerId"));

                    b.Property<string>("BusinessName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StoreProfile")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("StoreRating")
                        .HasColumnType("float");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("SellerId");

                    b.HasIndex("UserId");

                    b.ToTable("Sellers");

                    b.HasData(
                        new
                        {
                            SellerId = 1,
                            BusinessName = "Pizza Hub",
                            StoreProfile = "https://iconape.com/wp-content/files/ok/245677/png/kfc-new-logo.png",
                            StoreRating = 4.7999999999999998,
                            UserId = 1
                        },
                        new
                        {
                            SellerId = 2,
                            BusinessName = "Burger King",
                            StoreProfile = "https://cdn.sanity.io/images/kts928pd/production/d0c90d0e0305b341ee63b98de3e751fc8f53b02a-1536x864.png",
                            StoreRating = 5.0,
                            UserId = 1
                        });
                });

            modelBuilder.Entity("YetaiEatsAPI.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phonenumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            Email = "aryandhamala8@gmail.com",
                            Password = "test1",
                            Phonenumber = "9819398642",
                            Username = "Aryan Dhamala"
                        });
                });

            modelBuilder.Entity("YetaiEatsAPI.Models.UserRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("YetaiEatsAPI.Models.MenuItem", b =>
                {
                    b.HasOne("YetaiEatsAPI.Models.Seller", "Seller")
                        .WithMany()
                        .HasForeignKey("SellerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Seller");
                });

            modelBuilder.Entity("YetaiEatsAPI.Models.Seller", b =>
                {
                    b.HasOne("YetaiEatsAPI.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("YetaiEatsAPI.Models.UserRole", b =>
                {
                    b.HasOne("YetaiEatsAPI.Models.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("YetaiEatsAPI.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");

                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}
