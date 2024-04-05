using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FoodAPI.Models.Models.Dto
{
    public class CategoryUpdateDTO
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string CategoryName { get; set; }
        public string? CategoryDescription { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        [ForeignKey("SellerProfile")]
        public int SellerProfileId { get; set; }
    }
}
