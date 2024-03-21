using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YetaiEatsAPI.Models
{
    public class MenuItem
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Item name is required")]
        public string ItemName { get; set; }

        [Required(ErrorMessage = "Price is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be greater than or equal to 0")]
        public double Price { get; set; }

        [Required(ErrorMessage = "Image is required")]
        public string Image { get; set; }

        public double ItemRating { get; set; }

        [Required(ErrorMessage = "Time is required")]
        public string Time { get; set; }

        // Foreign key
        [ForeignKey("SellerId")]
        public int SellerId { get; set; }
        public virtual Seller Seller { get; set; }
    }
}
