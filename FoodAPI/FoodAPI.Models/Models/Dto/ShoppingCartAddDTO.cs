using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FoodAPI.Models.Models.Dto
{
    public class ShoppingCartAddDTO
    {
        [Required]
        public int FoodItemId { get; set; }
        [Range(1, 1000, ErrorMessage = "Please enter value between 1 and 100")]
        [Required]
        public int Count { get; set; }
        public string? ApplicationUserId { get; set; }
    }
}
