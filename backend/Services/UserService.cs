using backend.Database.Repositories;
using backend.DTOS;
using backend.Models;
using backend.Utils;

namespace backend.Services
{
	public class UserService
	{
		private readonly UserRepository _userRepository;

		public UserService(UserRepository userRepository)
		{
			_userRepository = userRepository;
		}

		public async Task<User> CreateUser(RegistrationRequestDTO request)
		{
			var userFinded = await _userRepository.FindByUserName(request.UserName);

			if (userFinded != null)
			{
				throw new BadHttpRequestException("Não foi possível prosseguir, encontramos um usuário já cadastrado com o nome de usuário informado.");
			}

			var hashedPassword = PasswordHasher.HashPassword(request.Password);

			var user = new User
			{
				Id = Guid.NewGuid(),
				UserName = request.UserName,
				Password = hashedPassword,
			};

			await _userRepository.AddUser(user);

			await _userRepository.SaveChanges();

			return user;
		}


		public async Task<User> AuthenticateUser(LoginRequestDTO request)
		{
			var userFinded = await _userRepository.FindByUserName(request.UserName);

			if (userFinded == null)
			{
				throw new BadHttpRequestException("Não foi possível prosseguir, credenciais incorretas.");
			}

			if (!PasswordHasher.VerifyPassword(request.Password, userFinded.Password))
			{
				throw new BadHttpRequestException("Não foi possível prosseguir, credenciais incorretas.");
			}

			return userFinded;
		}
	}
}