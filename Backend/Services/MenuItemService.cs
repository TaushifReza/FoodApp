using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using YetaiEatsAPI.Context;
using YetaiEatsAPI.DTOs;
using YetaiEatsAPI.Interfaces;
using YetaiEatsAPI.Models;

namespace YetaiEatsAPI.Services
{
    public class MenuItemService : IMenuItemService
    {
        private readonly JwtContext _context;

        public MenuItemService(JwtContext context)
        {
            _context = context;
        }

        public IEnumerable<MenuItem> GetMenuItems()
        {
            return _context.MenuItems
                .Include(m => m.Seller)
                .Select(m => new MenuItem
                {
                    Id = m.Id,
                    ItemName = m.ItemName,
                    Price = m.Price,
                    Image = m.Image,
                    Time = m.Time,
                    SellerId = m.SellerId,
                    Seller = new Seller
                    {
                        SellerId = m.Seller.SellerId,
                        BusinessName = m.Seller.BusinessName,
                        StoreRating = m.Seller.StoreRating,
                        StoreProfile = m.Seller.StoreProfile
                    }
                })
                .ToList();
        }


        public MenuItem GetMenuItemById(int id)
        {
            var menuItem = _context.MenuItems.FirstOrDefault(m => m.Id == id);
            if (menuItem == null)
            {
                return null;
            }

            return new MenuItem
            {
                Id = menuItem.Id,
                ItemName = menuItem.ItemName,
                Price = menuItem.Price,
                Image = menuItem.Image,
                Time = menuItem.Time,
                SellerId = menuItem.SellerId
            };
        }

        public MenuItemDTO AddMenuItem(MenuItemDTO menuItemDTO)
        {
            // Add new menu item
            var menuItem = new MenuItem
            {
                ItemName = menuItemDTO.ItemName,
                Price = menuItemDTO.Price,
                Image = menuItemDTO.Image,
                Time = menuItemDTO.Time,
                SellerId = menuItemDTO.SellerId
            };

            var addedMenuItem = _context.MenuItems.Add(menuItem);
            _context.SaveChanges();

            return new MenuItemDTO
            {
                Id = addedMenuItem.Entity.Id,
                ItemName = addedMenuItem.Entity.ItemName,
                Price = addedMenuItem.Entity.Price,
                Image = addedMenuItem.Entity.Image,
                Time = addedMenuItem.Entity.Time,
                SellerId = addedMenuItem.Entity.SellerId
            };
        }

        public MenuItemDTO UpdateMenuItem(int id, MenuItemDTO menuItemDTO)
        {
            var existingMenuItem = _context.MenuItems.FirstOrDefault(m => m.Id == id);
            if (existingMenuItem == null)
            {
                throw new Exception("MenuItem not found");
            }

            existingMenuItem.ItemName = menuItemDTO.ItemName;
            existingMenuItem.Price = menuItemDTO.Price;
            existingMenuItem.Image = menuItemDTO.Image;
            existingMenuItem.Time = menuItemDTO.Time;
            existingMenuItem.SellerId = menuItemDTO.SellerId;

            _context.SaveChanges();

            return new MenuItemDTO
            {
                Id = existingMenuItem.Id,
                ItemName = existingMenuItem.ItemName,
                Price = existingMenuItem.Price,
                Image = existingMenuItem.Image,
                Time = existingMenuItem.Time,
                SellerId = existingMenuItem.SellerId
            };
        }

        public bool DeleteMenuItem(int id)
        {
            var menuItem = _context.MenuItems.FirstOrDefault(m => m.Id == id);
            if (menuItem == null)
            {
                return false;
            }

            _context.MenuItems.Remove(menuItem);
            _context.SaveChanges();
            return true;
        }

        public IEnumerable<MenuItem> SearchMenuItems(string searchTerm)
        {
            // Convert the search term to lowercase for case-insensitive search
            searchTerm = searchTerm.ToLower();

            // Search for menu items that match the search term
            var matchingItems = _context.MenuItems
                .Where(m => m.ItemName.ToLower().Contains(searchTerm))
                .ToList();

            return matchingItems;
        }
    }
}
