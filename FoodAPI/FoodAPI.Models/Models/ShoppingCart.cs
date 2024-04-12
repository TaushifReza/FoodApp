using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FoodAPI.Models.Models
{
    public class ShoppingCart
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("FoodItem")]
        public int FoodItemId { get; set; }
        public FoodItem FoodItem { get; set; }

        [Range(1, 1000, ErrorMessage = "Please enter value between 1 and 100")]
        public int Count { get; set; }

        [ForeignKey("ApplicationUser")]
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        [NotMapped]
        public double? Price { get; set; }
    }
}
