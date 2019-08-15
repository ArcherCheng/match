using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MatchApi.Models;

namespace MatchApi.Repository
{
    public class BaseRepository
    {
        protected readonly AppDbContext _db;
        public BaseRepository(AppDbContext dbContext)
        {
            this._db = dbContext;
        }

        public void Add<T>(T entity) where T : class
        {
            _db.Add(entity);
            //_db.Set<T>().Add(entity);
            // _db.SaveChanges();
        }

        public void Update<T>(T entity) where T : class
        {
            _db.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            // var entry = _db.Entry(entity);
            // if (entry.State == EntityState.Detached)
            // {
            //     _db.Set<T>().Attach(entity);
            // }
            // entry.State = EntityState.Modified;
            // _db.SaveChanges();
        }

        public void Delete<T>(T entity) where T : class
        {
            _db.Remove(entity);
            // var entry = _db.Entry(entity);
            // if (entry.State == EntityState.Detached)
            // {
            //     _db.Set<T>().Attach(entity);
            // }
            // entry.State = EntityState.Deleted;
            // _db.Set<T>().Remove(entity);
            // _db.SaveChanges();
        }

        public int SaveAll()
        {
            return _db.SaveChanges();
        }
        
        public async Task<int> SaveAllAsync()
        {
            return await _db.SaveChangesAsync();
        }
    }
}