using SharedClassLibrary.Dto;
using static SharedClassLibrary.Dto.ServiceResponses;

namespace SharedClassLibrary.Contracts
{
    public interface IUserAccount
    {
        Task<GeneralResponse> CreateAccount(UserDTO userDTO);
        Task<LoginResponse> LoginAccount(LoginDTO loginDTO);
    }
}
