namespace backend.Models
{
	public class User
	{
		public Guid Id { get; set; }
		public required string UserName { get; set; }
		public required string Password { get; set; }
	}
}