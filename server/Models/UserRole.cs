using Microsoft.AspNetCore.Identity;

namespace server.Models
{
    public class UserRole: IdentityRole<string>
    {
        public UserRole() : base()
        {
            Id = Guid.NewGuid().ToString();
        }
    }
}
