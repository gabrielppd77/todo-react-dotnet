using backend.DTOS;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class UserController : ControllerBase
	{
		private readonly UserService _userService;
		private readonly TokenService _tokenService;

		public UserController(UserService userService, TokenService tokenService)
		{
			_userService = userService;
			_tokenService = tokenService;
		}

		[AllowAnonymous]
		[HttpPost("register")]
		public async Task<AuthResponseDTO> Register(RegistrationRequestDTO request)
		{
			var user = await _userService.CreateUser(request);
			var token = _tokenService.CreateToken(user.Id);
			return new AuthResponseDTO()
			{
				Token = token
			};
		}

		[AllowAnonymous]
		[HttpPost("login")]
		public async Task<AuthResponseDTO> Login(LoginRequestDTO request)
		{
			var user = await _userService.AuthenticateUser(request);
			var token = _tokenService.CreateToken(user.Id);
			return new AuthResponseDTO()
			{
				Token = token
			};
		}
	}
}