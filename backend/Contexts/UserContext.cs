using System.Security.Claims;

namespace backend.Contexts
{
	public class UserContext
	{
		private readonly IHttpContextAccessor _httpContextAccessor;

		public UserContext(IHttpContextAccessor httpContextAccessor)
		{
			_httpContextAccessor = httpContextAccessor;
		}

		public Guid UserId
		{
			get
			{
				if (_httpContextAccessor?.HttpContext != null)
				{
					var userIdClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
					return Guid.TryParse(userIdClaim, out var userId) ? userId : Guid.Empty;
				}
				else
				{
					return Guid.Empty;
				}
			}
		}
	}
}