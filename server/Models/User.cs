using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class User : IdentityUser
    {
        public required string Avatar { get; set; }
    }
}
