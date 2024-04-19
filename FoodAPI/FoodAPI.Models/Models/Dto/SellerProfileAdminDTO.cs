using System.ComponentModel.DataAnnotations;

namespace FoodAPI.Models.Models.Dto
{
    public class SellerProfileAdminDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }
    }
}
