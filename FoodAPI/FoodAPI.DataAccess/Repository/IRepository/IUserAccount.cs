using FoodAPI.Models.Models.Dto;
using static FoodAPI.Models.Models.Dto.ServiceResponsesDTO;

namespace FoodAPI.DataAccess.Repository.IRepository
{
    public interface IUserAccount
    {
        Task<GeneralResponse> CreateAccount(UserDTO userDTO);
        Task<LoginResponse> LoginAccount(LoginDTO loginDTO);
    }
}
