using System.Collections.Generic;
using MatchApi.Models;
using Newtonsoft.Json;

namespace MatchApi.Data
{
    public class Seed
    {
        private readonly AppDbContext _context;

        public Seed(AppDbContext context)
        {
            _context = context;
        }

        public void SeedMembers()
        {
            var memberJson=System.IO.File.ReadAllText("SeedData/member1.json");
            var members= JsonConvert.DeserializeObject<List<Member>>(memberJson);
            foreach (var member in members) 
            {
                byte[] passwordHash,passwordSalt;
                createPasswordHash("password",out passwordHash, out passwordSalt);
                member.PasswordHash = passwordHash;
                member.PasswordSalt = passwordSalt;
                member.IsCloseData=false;
                _context.Member.Add(member);
            }

            _context.SaveChanges();

        }
        private void createPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public void SeedMemberPhotos()
        {
            var photoJson=System.IO.File.ReadAllText("Data/photo1.json");
            var photos= JsonConvert.DeserializeObject<List<MemberPhoto>>(photoJson);
            foreach (var item in photos) 
            {
                _context.MemberPhoto.Add(item);
            }

            _context.SaveChanges();

        }        
        public void SeedMemberCondition()
        {
            var Jsondata=System.IO.File.ReadAllText("Data/condition1.json");
            var model= JsonConvert.DeserializeObject<List<MemberCondition>>(Jsondata);
            foreach (var item in model)
            {
                _context.MemberCondition.Add(item);
            }

            _context.SaveChanges();

        }        

        public void SeedLiker()
        {
            var today=System.DateTime.Now;
            var Jsondata=System.IO.File.ReadAllText("Data/liker.json");
            var model= JsonConvert.DeserializeObject<List<Liker>>(Jsondata);
            foreach (var item in model)
            {
                // item.AddedDate = today;
                _context.Liker.Add(item);
                _context.SaveChanges();
            } 
        }        
        
    }
}