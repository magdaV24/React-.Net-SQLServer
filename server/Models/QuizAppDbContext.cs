using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public class QuizAppDbContext : IdentityDbContext<User, UserRole, string>
    {
        public QuizAppDbContext(DbContextOptions<QuizAppDbContext> options) : base(options)
        { }
        public DbSet<Card> Cards { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

        }

    }
}
