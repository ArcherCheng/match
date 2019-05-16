using System.Linq;
using System.Threading.Tasks;
using MatchApi.Models;

namespace MatchApi.Repository
{
    public class RepoUserLog :BaseRepository, IRepoUserLog
    {
        public RepoUserLog(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<int> AddLogAsync(Aa9log20 log, string userId)
        {
            // Member member;
            // if (int.Parse(userId) != 0)
            // {
            //     member = _db.Member.FirstOrDefault(x => x.UserId == int.Parse(userId));
            //     member.ActiveDate = System.DateTime.Now;
            // }
            _db.Aa9log20.Add(log);
            return(await _db.SaveChangesAsync());
        }
    }
}