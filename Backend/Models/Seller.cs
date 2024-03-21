using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YetaiEatsAPI.Models
{
    public class Seller
    {
        [Key]
        public int SellerId { get; set; }

        [Required(ErrorMessage = "Business name is required")]
        public string BusinessName { get; set; }
        public double StoreRating { get; set; }
        public string StoreProfile { get; set; }

        // Foreign key
        [ForeignKey("UserId")]
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
