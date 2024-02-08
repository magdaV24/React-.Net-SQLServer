using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace server.DTOs
{
    public class RegisterDTO : LoginDTO
    {
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Avatar { get; set; }
    }
}
