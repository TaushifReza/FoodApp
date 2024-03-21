using System.ComponentModel.DataAnnotations;

namespace YetaiEatsAPI.DTOs
{
    public class MenuItemDTO
    {
        public int Id { get; internal set; }
        // Remove the Id property
        [Required(ErrorMessage = "Item name is required")]
        public string ItemName { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Price must be greater than or equal to 0")]
        public double Price { get; set; }

        [Required(ErrorMessage = "Image is required")]
        public string Image { get; set; }

        [Required(ErrorMessage = "Time is required")]
        public string Time { get; set; }

        [Required(ErrorMessage = "SellerId is required")]
        public int SellerId { get; set; }
    }
}
