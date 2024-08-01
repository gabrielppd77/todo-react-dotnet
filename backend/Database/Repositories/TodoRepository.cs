using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Database.Repositories
{
	public class TodoRepository
	{
		private readonly SQLServerContext _sqlServerContext;

		public TodoRepository(SQLServerContext sqlServerContext)
		{
			_sqlServerContext = sqlServerContext;
		}

		internal async Task<List<Todo>> GetAllTodos(Guid userId)
		{
			return await _sqlServerContext.Todo
				.AsNoTracking()
				.Where(x => x.UserId == userId)
				.ToListAsync();
		}

		internal async Task AddTodo(Todo todo)
		{
			await _sqlServerContext.Todo.AddAsync(todo);
		}

		internal async Task<Todo?> GetById(Guid todoId)
		{
			return await _sqlServerContext.Todo
				.Where(x => x.Id == todoId)
				.FirstOrDefaultAsync();
		}

		internal void RemoveTodo(Todo todo)
		{
			_sqlServerContext.Todo.Remove(todo);
		}

		internal async Task SaveChanges()
		{
			await _sqlServerContext.SaveChangesAsync();
		}
	}
}