using System.ComponentModel.DataAnnotations;

namespace YetaiEatsAPI.DTOs
{
    public class UserDTO
    {
        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone number is required")]
        [Phone(ErrorMessage = "Invalid phone number")]
        [StringLength(15, MinimumLength = 10, ErrorMessage = "Phone number must have at least 10 digits")]
        public string Phonenumber { get; set; } = string.Empty;
    }
}
