using System.Collections.Generic;
using YetaiEatsAPI.DTOs;
using YetaiEatsAPI.Models;

namespace YetaiEatsAPI.Interfaces
{
    public interface IMenuItemService
    {
        IEnumerable<MenuItem> GetMenuItems();
        MenuItem GetMenuItemById(int id);
        MenuItemDTO AddMenuItem(MenuItemDTO menuItemDTO);
        MenuItemDTO UpdateMenuItem(int id, MenuItemDTO menuItemDTO);
        bool DeleteMenuItem(int id);
        IEnumerable<MenuItem> SearchMenuItems(string searchTerm);
    }
}
