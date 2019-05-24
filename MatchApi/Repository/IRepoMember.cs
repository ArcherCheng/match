using System.Collections.Generic;
using System.Threading.Tasks;
using MatchApi.Helpers;
using MatchApi.Models;

namespace MatchApi.Repository
{
    public interface IRepoMember : IBaseRepository
    {
        Task<Member> GetMemberEdit(int userId);
        Task<bool> AddMyLiker(int userId, int likeId);
        Task<bool> DeleteMyLiker(int userId, int likeId); 
        Task<PageList<Member>> GetMyLikerPageList(int userId, ParamsMember para);
        Task<IEnumerable<Member>> GetMyLikerList(int userId);
        bool HasMainPhoto(int userId);
        Task<MemberPhoto> GetPhoto(int id);
        Task<MemberPhoto> GetMainPhoto(int userId);
        Task<Message> GetMessage(int msgId);
        Task<PageList<Message>> GetMessagesForUser(ParamsMember para);
        Task<IEnumerable<Message>> GetMessageThread(int myId, int recipientId);
        Task<IEnumerable<Message>> GetUnreadMessages(int myId);

    }
}