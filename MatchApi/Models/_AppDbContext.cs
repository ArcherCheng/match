using Microsoft.EntityFrameworkCore;

namespace MatchApi.Models
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext() 
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("name=DefaultConnection");
            }
        }        
        
    }
}