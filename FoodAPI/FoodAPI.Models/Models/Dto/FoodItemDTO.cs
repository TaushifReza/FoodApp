using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace FoodAPI.Models.Models.Dto
{
    public class FoodItemDTO
    {
        public int Id { get; set; }
        [Required]
        public string FoodName { get; set; }
        public string? FoodDescription { get; set; }
        [Required]
        public double FoodPrice { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public DateTime UpdatedDate { get; set; } = DateTime.Now;
        [ForeignKey("SellerProfile")]
        public int SellerProfileId { get; set; }
        public SellerProfile SellerProfile { get; set; }
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
