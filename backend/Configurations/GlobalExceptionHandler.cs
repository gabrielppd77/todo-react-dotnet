using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace backend.Configurations
{
	public class GlobalExceptionHandler : IExceptionHandler
	{
		private readonly ILogger<GlobalExceptionHandler> _logger;

		public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
		{
			_logger = logger;
		}

		public async ValueTask<bool> TryHandleAsync(
			HttpContext httpContext,
			Exception exception,
			CancellationToken cancellationToken)
		{
			_logger.LogError(exception, $"Exception occured : {exception.Message}");

			var title = "Internal Server Error";
			var status = StatusCodes.Status500InternalServerError;

			if (exception is BadHttpRequestException)
			{
				title = "An unexpected error occurred";
				status = StatusCodes.Status400BadRequest;
			}

			var problemDetails = new ProblemDetails
			{
				Type = exception.GetType().Name,
				Status = status,
				Title = title,
				Detail = exception.Message,
				Instance = $"{httpContext.Request.Method} {httpContext.Request.Path}"
			};

			httpContext.Response.StatusCode = problemDetails.Status.Value;

			await httpContext.Response
				.WriteAsJsonAsync(problemDetails, cancellationToken);

			return true;
		}
	}
}