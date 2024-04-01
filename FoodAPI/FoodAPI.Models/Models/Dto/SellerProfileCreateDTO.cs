using System.ComponentModel.DataAnnotations;

namespace FoodAPI.Models.Models.Dto
{
    public class SellerProfileCreateDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }
        public string? ApplicationUserId { get; set; }
    }
}
