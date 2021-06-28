using Fullstack.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fullstack.Service.Interface
{
    public interface IApi
    {
        Task<User> DeleteUser(int id);
        Task<User> GetUser(int id);
        Task<IEnumerable<User>> GetUsers();
        Task<User> PatchUser(int id, User user);
        Task<User> PostUser(User user);

        bool UserExists(int id);
    }
}