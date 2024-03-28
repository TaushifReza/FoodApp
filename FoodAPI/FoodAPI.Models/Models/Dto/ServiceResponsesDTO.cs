namespace FoodAPI.Models.Models.Dto
{
    public class ServiceResponsesDTO
    {
        public record class GeneralResponse(bool Flag, string? Message);
        public record class LoginResponse(bool IsSuccess, string Token, string Message, object User, object? UserProfile, string? Role);
    }
}
