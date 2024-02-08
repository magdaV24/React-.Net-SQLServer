using System.Security.Cryptography;

namespace server.Utils
{
    public class JwtSecret
    {
        public static string GenerateSecretKey(int keySize = 32)
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                byte[] keyBytes = new byte[keySize];
                rng.GetBytes(keyBytes);
                return Convert.ToBase64String(keyBytes);
            }
        }
    }
}
