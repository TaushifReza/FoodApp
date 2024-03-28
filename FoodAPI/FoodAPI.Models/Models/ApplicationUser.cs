using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace FoodAPI.Models.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FullName { get; set; }

        [Required]
        [MinLength(10)]
        [MaxLength(10)]
        public override string? PhoneNumber { get; set; }
        public string? Address { get; set; }
    }
}
