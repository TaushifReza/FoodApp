using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodAPI.Models.Models
{
    public class SellerProfile
    {
        [Key]
        public int Id { get; set; }
        [Required] 
        public string Name{ get; set; }
        [Required]
        public string Address { get; set; }
        public int ApplicationUserId { get; set; }
        [ForeignKey("ApplicationUserId")]
        public ApplicationUser ApplicationUser { get; set; }
    }
}
