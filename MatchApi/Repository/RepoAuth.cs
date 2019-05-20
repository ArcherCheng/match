using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MatchApi.Models;
using Microsoft.EntityFrameworkCore;
using MatchApi.Helpers;

namespace MatchApi.Repository
{
    public class RepoAuth : BaseRepository, IRepoAuth
    {
        public RepoAuth(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IEnumerable<CheckboxItem>> GetCheckBoxItemList(string keyGroup)
        {
            var result = await _db.CheckboxItem
                .Where(x => x.KeyGroup == keyGroup)
                .OrderBy(x =>x.KeySeq)
                // .Select(x => new {
                //     KeyId = x.KeyId,
                //     KeyValue =  x.KeyValue,
                //     IsChecked = x.IsChecked
                // })
                .ToListAsync();
            return result;        
        }

        public async Task<Member> Login(string userEmailPhone, string password)
        {
            var user = await _db.Member.FirstOrDefaultAsync(x => x.Email == userEmailPhone || x.Phone == userEmailPhone);
            if(user == null)
                return null;

            if(!PasswordHash.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        public async Task<Member> Register(Member user, string password)
        {
            byte[] passwordHash, passwordSalt;
            PasswordHash.CreatePasswordHash(password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _db.Member.AddAsync(user);
            await _db.SaveChangesAsync();

            return user;
        }

        public async Task<bool> UserIsExists(string userEmail, string userPhone)
        {
            var user = await _db.Member.FirstOrDefaultAsync(p => p.Phone == userPhone || p.Email == userEmail);
            if (user == null)
                return false;

            return true;
        }

        // private bool verifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        // {
        //     using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
        //     {
        //         var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        //         for (int i = 0; i < computedHash.Length; i++)
        //         {
        //             if (computedHash[i] != passwordHash[i]) return false;
        //         }
        //         return true;
        //     }
        // }
        
        // private void createPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        // {
        //     using (var hmac = new System.Security.Cryptography.HMACSHA512())
        //     {
        //         passwordSalt = hmac.Key;
        //         passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        //     }
        // }

        public async Task<Member> GetMember(string email, string phone)
        {
            var user = await _db.Member.FirstOrDefaultAsync(p => p.Phone == phone && p.Email == email);

            return user;
        }
    }
}