using System.ComponentModel.DataAnnotations;

namespace FoodAPI.Models.Models.Dto
{
    public class UserDTO
    {
        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [MinLength(10)]
        [MaxLength(10)]
        public  string PhoneNumber { get; set; }

        [Required]
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Password)]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; } = string.Empty;
        [Required]
        public string Address { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
