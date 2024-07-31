using System.ComponentModel.DataAnnotations;

namespace backend.DTOS
{
	public class RegistrationRequestDTO
	{
		[Required]
		public required string UserName { get; set; }

		[Required]
		public required string Password { get; set; }
	}
}