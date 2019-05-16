using System.Collections.Generic;
using System.Threading.Tasks;
using MatchApi.Helpers;
using MatchApi.Models;

namespace MatchApi.Repository
{
    public interface IRepoHome : IBaseRepository
    {
       //使用者資料
        Task<PageList<Member>> GetUserList(ParamsMember para);
        Task<Member> GetUserDetail(int userId);
        Task<IEnumerable<MemberPhoto>> GetUserPhotos(int userId);   
        //配對條件資料
        Task<MemberCondition> GetUserCondition(int userId);
        //配對列表
        Task<PageList<Member>> GetMatchList(ParamsMember para);
    }
}