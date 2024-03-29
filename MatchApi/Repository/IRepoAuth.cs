using System.Collections.Generic;
using System.Threading.Tasks;
using MatchApi.Models;

namespace MatchApi.Repository
{
    public interface IRepoAuth : IBaseRepository
    {
         Task<Member> Register(Member user, string password);
         Task<Member> GetMember(string email, string phone);
         Task<Member> Login(string userEmail, string password);
         Task<bool> UserIsExists(string userEmail, string userPhone);
         Task<IEnumerable<GroupKeyValue>> GetGroupKeyValueList(string keyGroup);
    }
}