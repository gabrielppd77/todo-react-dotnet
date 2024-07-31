import { useMutation } from "@tanstack/react-query";

import { extractError } from "@libs/alert";
import api from "@libs/api";

import { RegistrationRequestDTO } from "./dtos/RegistrationRequestDTO";
import { LoginRequestDTO } from "./dtos/LoginRequestDTO";
import { AuthResponseDTO } from "./dtos/AuthResponseDTO";

function useRegister() {
  return useMutation({
    mutationFn: async (data: RegistrationRequestDTO) => {
      const response = await api.post<AuthResponseDTO>("/user/register", data);
      return response.data;
    },
    onError: extractError,
  });
}

function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginRequestDTO) => {
      const response = await api.post<AuthResponseDTO>("/user/login", data);
      return response.data;
    },
    onError: extractError,
  });
}

export { useRegister, useLogin };
