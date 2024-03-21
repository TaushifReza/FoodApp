using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YetaiEatsAPI.Models
{
    public class AddUserRole
    {
        [Required(ErrorMessage = "UserId is required")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "RoleIds is required")]
        [MinLength(1, ErrorMessage = "At least one role must be provided")]
        public List<int> RoleIds { get; set; }
    }
}
