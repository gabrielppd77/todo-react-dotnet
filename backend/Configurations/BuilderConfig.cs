using System.Text;
using backend.Settings;
using backend.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace backend.Configurations
{
	public static class BuilderConfig
	{
		public static void ConfigBuild(this WebApplicationBuilder builder)
		{
			builder.AddConfigServices();
			builder.AddConfigs();
			builder.AddJWT();
			builder.AddCorsPolicy();
		}

		public static void AddConfigServices(this WebApplicationBuilder builder)
		{
			builder.Services.AddControllers();
			builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
			builder.Services.AddProblemDetails();
			builder.Services.AddHttpContextAccessor();
			builder.Services.AddContexts();
			builder.Services.AddServices();
			builder.Services.AddRepositories();
		}

		public static void AddConfigs(this WebApplicationBuilder builder)
		{
			builder.Services.Configure<JwtSetting>(builder.Configuration.GetSection("JwtSetting"));
		}

		public static void AddJWT(this WebApplicationBuilder builder)
		{
			var secret = builder.Configuration["JwtSetting:Secret"];
			if (string.IsNullOrEmpty(secret))
			{
				throw new InvalidOperationException("Jwt Configuration, Secret Key not found.");
			}
			builder.Services.AddAuthentication(x =>
			{
				x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			})
			.AddJwtBearer(x =>
			{
				x.RequireHttpsMetadata = false;
				x.SaveToken = true;
				x.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
					ValidateIssuer = false,
					ValidateAudience = false,
					ValidateLifetime = true
				};
			});
		}

		public static void AddCorsPolicy(this WebApplicationBuilder builder)
		{
			var allowedOrigins = builder.Configuration.GetSection("CorsSettings:AllowedOrigins").Get<string[]>();
			builder.Services.AddCors(options =>
			{
				options.AddPolicy(Constants.CorsPolicy,
					builder => builder.WithOrigins(allowedOrigins ?? [])
										.AllowAnyMethod()
										.AllowAnyHeader()
										.AllowCredentials());
			});
		}
	}
}