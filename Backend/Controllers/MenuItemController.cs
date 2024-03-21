using Microsoft.AspNetCore.Mvc;
using YetaiEatsAPI.Interfaces;
using YetaiEatsAPI.DTOs;

namespace YetaiEatsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemController : ControllerBase
    {
        private readonly IMenuItemService _menuItemService;

        public MenuItemController(IMenuItemService menuItemService)
        {
            _menuItemService = menuItemService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<MenuItemDTO>), 200)]
        public IActionResult GetMenuItems()
        {
            var menuItems = _menuItemService.GetMenuItems();
            return Ok(menuItems);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(MenuItemDTO), 200)]
        [ProducesResponseType(404)]
        public IActionResult GetMenuItemById(int id)
        {
            var menuItem = _menuItemService.GetMenuItemById(id);
            if (menuItem == null)
            {
                return NotFound();
            }
            return Ok(menuItem);
        }

        [HttpPost]
        [ProducesResponseType(typeof(MenuItemDTO), 201)]
        [ProducesResponseType(400)]
        public IActionResult AddMenuItem([FromBody] MenuItemDTO menuItemDTO)
        {
            var addedMenuItem = _menuItemService.AddMenuItem(menuItemDTO);
            return CreatedAtAction(nameof(GetMenuItemById), new { id = addedMenuItem.Id }, addedMenuItem);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(MenuItemDTO), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult UpdateMenuItem(int id, [FromBody] MenuItemDTO menuItemDTO)
        {
            var updatedMenuItem = _menuItemService.UpdateMenuItem(id, menuItemDTO);
            if (updatedMenuItem == null)
            {
                return NotFound();
            }
            return Ok(updatedMenuItem);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteMenuItem(int id)
        {
            var deleted = _menuItemService.DeleteMenuItem(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult SearchMenuItems(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                return BadRequest("Search term cannot be empty");
            }

            var matchingItems = _menuItemService.SearchMenuItems(searchTerm);
            return Ok(matchingItems);
        }
    }
}
