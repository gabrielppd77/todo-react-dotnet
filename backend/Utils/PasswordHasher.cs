using System.Security.Cryptography;

namespace backend.Utils
{
	public static class PasswordHasher
	{
		private const int SaltSize = 16; // 128 bit
		private const int KeySize = 32; // 256 bit
		private const int Iterations = 10000;
		private static readonly HashAlgorithmName HashAlgorithm = HashAlgorithmName.SHA256;

		public static string HashPassword(string password)
		{
			using (var rng = RandomNumberGenerator.Create())
			{
				// Generate a salt
				byte[] salt = new byte[SaltSize];
				rng.GetBytes(salt);

				// Hash the password with the salt
				var hash = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithm).GetBytes(KeySize);

				// Combine the salt and the hash into a single array
				var hashBytes = new byte[SaltSize + KeySize];
				Array.Copy(salt, 0, hashBytes, 0, SaltSize);
				Array.Copy(hash, 0, hashBytes, SaltSize, KeySize);

				// Convert to base64 for storage
				return Convert.ToBase64String(hashBytes);
			}
		}

		public static bool VerifyPassword(string password, string hashedPassword)
		{
			// Get the bytes of the stored hash
			var hashBytes = Convert.FromBase64String(hashedPassword);

			// Extract the salt
			var salt = new byte[SaltSize];
			Array.Copy(hashBytes, 0, salt, 0, SaltSize);

			// Hash the input password with the extracted salt
			var hash = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithm).GetBytes(KeySize);

			// Compare the result with the stored hash
			for (int i = 0; i < KeySize; i++)
			{
				if (hashBytes[i + SaltSize] != hash[i])
				{
					return false;
				}
			}
			return true;
		}
	}
}