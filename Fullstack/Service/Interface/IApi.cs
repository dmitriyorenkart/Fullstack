using Fullstack.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fullstack.Service.Interface
{
    public interface IApi
    {
    
        
        Task<IEnumerable<ManageTask>> GetTasks();
        Task<IEnumerable<ManageTask>> GetExpiringTasks();


    }
}