using backend.Contexts;
using backend.Database.Repositories;
using backend.DTOS;
using backend.Models;

namespace backend.Services
{
	public class TodoService
	{
		private readonly TodoRepository _todoRepository;
		private readonly UserContext _userContext;

		public TodoService(TodoRepository todoRepository, UserContext userContext)
		{
			_todoRepository = todoRepository;
			_userContext = userContext;
		}

		internal async Task<List<TodoResponseDTO>> GetAll()
		{
			var todos = await _todoRepository.GetAllTodos(_userContext.UserId);
			return todos
				.Select(x => new TodoResponseDTO()
				{
					Id = x.Id,
					Title = x.Title,
					Description = x.Description,
					IsConcluded = x.IsConcluded,
					UpdatedAt = x.UpdatedAt
				})
				.ToList();
		}

		internal async Task Create(TodoRequestCreateDTO request)
		{
			var todo = new Todo()
			{
				Id = Guid.NewGuid(),
				UserId = _userContext.UserId,
				Title = request.Title,
				Description = request.Description,
				IsConcluded = false,
				UpdatedAt = null,
			};
			await _todoRepository.AddTodo(todo);
			await _todoRepository.SaveChanges();
		}

		internal async Task Update(Guid todoId, TodoRequestUpdateDTO request)
		{
			var todo = await _todoRepository.GetById(todoId);

			if (todo == null)
			{
				throw new BadHttpRequestException("Não foi possível encontrar a Tarefa.");
			}

			todo.Title = request.Title;
			todo.Description = request.Description;
			todo.UpdatedAt = DateTime.UtcNow.AddHours(-3);

			await _todoRepository.SaveChanges();
		}

		internal async Task ToggleTodo(Guid todoId)
		{
			var todo = await _todoRepository.GetById(todoId);

			if (todo == null)
			{
				throw new BadHttpRequestException("Não foi possível encontrar a Tarefa.");
			}

			todo.IsConcluded = !todo.IsConcluded;

			await _todoRepository.SaveChanges();
		}

		internal async Task Remove(Guid todoId)
		{
			var todo = await _todoRepository.GetById(todoId);

			if (todo == null)
			{
				throw new BadHttpRequestException("Não foi possível encontrar a Tarefa.");
			}

			_todoRepository.RemoveTodo(todo);

			await _todoRepository.SaveChanges();
		}
	}
}