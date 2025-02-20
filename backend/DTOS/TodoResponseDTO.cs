namespace backend.DTOS
{
	public class TodoResponseDTO
	{
		public Guid Id { get; set; }
		public required string Title { get; set; }
		public required string Description { get; set; }
		public bool IsConcluded { get; set; }
		public DateTime? UpdatedAt { get; set; }
	}
}