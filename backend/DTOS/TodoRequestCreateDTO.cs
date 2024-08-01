namespace backend.DTOS
{
	public class TodoRequestCreateDTO
	{
		public required string Title { get; set; }
		public required string Description { get; set; }
	}
}