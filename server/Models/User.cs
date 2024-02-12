using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class User : IdentityUser
    {
        [MaxLength(50)]
        public required string Avatar { get; set; }
    }
}
