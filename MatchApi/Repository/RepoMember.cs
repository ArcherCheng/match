using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MatchApi.Helpers;
using MatchApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MatchApi.Repository
{
    public class RepoMember : BaseRepository, IRepoMember
    {
        public RepoMember(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<bool> AddMyLiker(int userId, int likeId)
        {
            var liker = await _db.Liker.FirstOrDefaultAsync(x => x.UserId == userId && x.LikerId == likeId);
            if (liker != null){
                // return false;
                // liker.DeleteDate = null;
                liker.IsDelete = false; 
                _db.Update(liker);
             } else {
                var result = new Liker()
                {
                    UserId = userId,
                    LikerId = likeId,
                    AddedDate = System.DateTime.Now,
                    IsDelete = false         
                };
                _db.Add(result);
             }

            _db.SaveChanges();

            return true;
        }

        public async Task<bool> DeleteMyLiker(int userId, int likeId)
        {
            var liker = await _db.Liker.FirstOrDefaultAsync(x => x.UserId == userId && x.LikerId == likeId);
            if (liker == null){
                return false;
             }

            liker.IsDelete = true;
            liker.DeleteDate = System.DateTime.Now;

            _db.Update(liker);
            _db.SaveChanges();

            return true;
        }


        public async Task<Member> GetMemberEdit(int userId)
        {
            var result = await _db.Member
                .Include(x => x.MemberDetail)
                .Include(x => x.MemberPhoto)
                .FirstOrDefaultAsync(x => x.UserId == userId);
            return result;
        }

        public async Task<IEnumerable<Member>> GetMyLikerList(int userId)
        {
            var likerList = await _db.Liker
                .Where(x => x.UserId == userId && !x.IsDelete && !x.LikerNavigation.IsCloseData)
                .Select(x => x.LikerNavigation)
                .ToListAsync();
            return likerList;
        }

        public async Task<PageList<Member>> GetMyLikerPageList(int userId, ParamsMember para)
        {
            var likerList = _db.Liker
                .Where(x => x.UserId == userId && !x.IsDelete && !x.LikerNavigation.IsCloseData)
                .Select(x => x.LikerNavigation)
                .AsQueryable();
            return await PageList<Member>.CreateAsync(likerList, para.PageNumber, para.PageSize);
        }

        public async Task<MemberPhoto> GetPhoto(int id)
        {
            var result = await _db.MemberPhoto.FirstOrDefaultAsync(x => x.Id == id);

            return result;
        }
        
        public async Task<MemberPhoto> GetMainPhoto(int userId)
        {
            var result = await _db.MemberPhoto.FirstOrDefaultAsync(x => x.UserId == userId && x.IsMain);

            return result;
        }

        public bool HasMainPhoto(int userId)
        {
            var result = _db.MemberPhoto.FirstOrDefault(x => x.UserId == userId && x.IsMain);
            if (result == null)
                return false;

            return true;
        }

        public async Task<Message> GetMessage(int msgId)
        {
            var result = await _db.Message.FirstOrDefaultAsync(p => p.Id == msgId);
            return result;
        }

        public async Task<PageList<Message>> GetMessagesForUser(ParamsMember para)
        {
            var _lastDate = System.DateTime.Now.AddMonths(-1);
            var result = _db.Message
                .Include(p => p.Sender)     // .ThenInclude(p => p.MemberPhoto)
                .Include(p => p.Recipient)  // .ThenInclude(p => p.MemberPhoto)
                .AsQueryable();

            switch (para.MessageContainer)
            {
                case "Inbox":
                    result = result.Where(p => p.RecipientId == para.UserId && p.RecipientDeleted == false && p.SendDate > _lastDate);
                    break;
                case "Outbox":
                    result = result.Where(p => p.SenderId == para.UserId && p.SenderDeleted == false && p.SendDate > _lastDate);
                    break;
                default:
                    result = result.Where(p => p.RecipientId == para.UserId
                        && p.RecipientDeleted == false && p.IsRead == false && p.SendDate > _lastDate);
                    break;
            }

            result = result.OrderByDescending(p => p.SendDate);

            return await PageList<Message>.CreateAsync(result, para.PageNumber, para.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int myId, int recipientId)
        {
            var _lastDate = System.DateTime.Now.AddMonths(-1);
            var result = await _db.Message
            .Include(p => p.Sender)     //.ThenInclude(p=>p.MemberPhoto)
            .Include(p => p.Recipient)  //.ThenInclude(p=>p.MemberPhoto)
            .Where(p => p.RecipientId == myId && p.RecipientDeleted == false && p.SenderId == recipientId && p.SendDate > _lastDate
                || p.RecipientId == recipientId && p.SenderId == myId && p.SenderDeleted == false && p.SendDate > _lastDate)
            .OrderByDescending(p => p.SendDate)
            .ToListAsync();

            return result;
        }

        public async Task<IEnumerable<Message>> GetUnreadMessages(int myId)
        {
            var _lastDate = System.DateTime.Now.AddMonths(-1);
            var result = await _db.Message
                .Include(x => x.Sender)
                .Include(x => x.Recipient)
                .Where(x => x.RecipientId == myId && x.SendDate > _lastDate && x.RecipientDeleted == false && x.IsRead == false)
                .OrderBy(x => x.SendDate)
                .ToListAsync();
            return result;
        }
    }
}
