using System.Collections.Generic;
using System.Threading.Tasks;
using MatchApi.Models;

namespace MatchApi.Repository
{
    public interface IRepoUserLog
    {
        Task<int> AddUserLogAsync(SysUserLog entity, string userId);
        // Task<int> UpdateUserActivateDateAsync(int userId);
    }
}