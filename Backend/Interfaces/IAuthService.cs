using YetaiEatsAPI.DTOs;
using YetaiEatsAPI.Models;

namespace YetaiEatsAPI.Interfaces
{
    public interface IAuthService
    {
        UserDTO Register(UserDTO userDTO, string signUpType);
        string Login(LoginRequest loginRequest);
        Role AddRole(Role role);
        bool AssignRoleToUser(AddUserRole obj);
    }
}
