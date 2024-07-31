using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Database
{
	public class SQLServerContext : DbContext
	{
		private readonly IConfiguration _configuration;

		public SQLServerContext(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		public DbSet<User> User { get; set; }
		public DbSet<Todo> Todo { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			var connectionString = _configuration.GetConnectionString("DefaultConnection");
			if (string.IsNullOrEmpty(connectionString))
			{
				throw new InvalidOperationException("Connection string not found.");
			}
			optionsBuilder.UseSqlServer(connectionString);
			base.OnConfiguring(optionsBuilder);
		}
	}
}