using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace FoodAPI.Models.Models.Dto
{
    public class FoodItemCreateDTO
    {
        [Required]
        public IFormFile FoodImage { get; set; }
        [Required]
        public string FoodName { get; set; }
        public string? FoodDescription { get; set; }
        [Required]
        public double FoodPrice { get; set; }
    }
}
