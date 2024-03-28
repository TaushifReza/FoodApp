using System.ComponentModel.DataAnnotations;

namespace FoodAPI.Models.Models.Dto
{
    public class CategoryCreateDTO
    {
        [Required]
        public string CategoryName { get; set; }
        public string? CategoryDescription { get; set; }
        [Required]
        public int SellerProfileId { get; set; }
    }
}
