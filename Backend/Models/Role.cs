using System.ComponentModel.DataAnnotations;

namespace YetaiEatsAPI.Models
{
    public class Role
    {
        public int RoleId { get; set; }

        [Required(ErrorMessage = "Role name is required")]
        public string Rolename { get; set; } = string.Empty;
    }
}
