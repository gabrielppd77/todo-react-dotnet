using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Database.Repositories
{
	public class UserRepository
	{
		private readonly SQLServerContext _sqlServerContext;

		public UserRepository(SQLServerContext sqlServerContext)
		{
			_sqlServerContext = sqlServerContext;
		}

		internal async Task AddUser(User user)
		{
			await _sqlServerContext.User.AddAsync(user);
		}

		internal async Task<User?> FindByUserName(string userName)
		{
			return await _sqlServerContext.User.Where(x => x.UserName == userName).FirstOrDefaultAsync();
		}

		internal async Task SaveChanges()
		{
			await _sqlServerContext.SaveChangesAsync();
		}
	}
}