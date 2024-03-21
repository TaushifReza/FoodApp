using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YetaiEatsAPI.Models
{
    public class UserRole
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "RoleId is required")]

        //Foreign Key
        [ForeignKey("RoleId")]
        public int RoleId { get; set; }
        public virtual Role Role { get; set; }

        [Required(ErrorMessage = "UserId is required")]

        //Foreign Key
        [ForeignKey("UserId")]
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
