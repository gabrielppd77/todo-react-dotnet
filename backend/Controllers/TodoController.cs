using backend.DTOS;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class TodoController : ControllerBase
	{
		private readonly TodoService _todoService;

		public TodoController(TodoService todoService)
		{
			_todoService = todoService;
		}

		[HttpGet()]
		public async Task<List<TodoResponseDTO>> GetAll()
		{
			return await _todoService.GetAll();
		}

		[HttpPost()]
		public async Task Create(TodoRequestCreateDTO request)
		{
			await _todoService.Create(request);
		}

		[HttpPut("{todoId}")]
		public async Task Update(Guid todoId, TodoRequestUpdateDTO request)
		{
			await _todoService.Update(todoId, request);
		}

		[HttpPatch("ToggleTodo/{todoId}")]
		public async Task ToggleTodo(Guid todoId)
		{
			await _todoService.ToggleTodo(todoId);
		}

		[HttpDelete("{todoId}")]
		public async Task Remove(Guid todoId)
		{
			await _todoService.Remove(todoId);
		}
	}
}