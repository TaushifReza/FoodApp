using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace FoodAPI.Models.Models.Dto
{
    public class FoodItemCreateDTO
    {
        [Required]
        [NotMapped]
        public IFormFile? FoodImage { get; set; }
        [Required]
        public string FoodName { get; set; }
        public string? FoodDescription { get; set; }
        [Required]
        public double FoodPrice { get; set; }
        public string? ImageUrl { get; set; }
        public int CategoryId { get; set; }
        public int? SellerProfileId { get; set; }
    }
}
