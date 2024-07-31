using backend.Database;
using backend.Database.Repositories;
using backend.Services;

namespace backend.Configurations
{
	public static class DependencyResolveConfig
	{
		public static void AddContexts(this IServiceCollection services)
		{
			services.AddScoped<SQLServerContext>();
		}

		public static void AddServices(this IServiceCollection services)
		{
			services.AddScoped<UserService>();
			services.AddScoped<TokenService>();
		}

		public static void AddRepositories(this IServiceCollection services)
		{
			services.AddScoped<UserRepository>();
		}
	}
}