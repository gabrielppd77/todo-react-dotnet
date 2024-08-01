import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import api from "@libs/api";

import { extractError } from "@libs/alert";
import { notifyCreate, notifyUpdate, notifyRemove } from "@libs/notification";

import { TodoResponseDTO } from "./dtos/TodoResponseDTO";
import { TodoRequestCreateDTO } from "./dtos/TodoRequestCreateDTO";
import { TodoRequestUpdateDTO } from "./dtos/TodoRequestUpdateDTO";

const query = ["todo"];

function useTodoGetAll() {
  async function handleRequest() {
    const response = await api.get<TodoResponseDTO[]>("/Todo");
    return response.data;
  }

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: query,
    queryFn: handleRequest,
  });

  if (error) extractError(error);

  return { data, isLoading, isFetching };
}

function useTodoCreate() {
  const queryClient = useQueryClient();

  async function handleRequest(data: TodoRequestCreateDTO) {
    await api.post("/Todo", data);
  }

  const { mutateAsync: mutateAsyncCreate, isPending: isLoadingCreate } =
    useMutation({
      mutationFn: handleRequest,
      onSuccess: () => {
        notifyCreate();
        queryClient.invalidateQueries({
          queryKey: query,
        });
      },
      onError: extractError,
    });

  return {
    mutateAsyncCreate,
    isLoadingCreate,
  };
}

interface RequestUpdateProps {
  id: string;
  data: TodoRequestUpdateDTO;
}

function useTodoUpdate() {
  const queryClient = useQueryClient();

  async function handleRequest({ id, data }: RequestUpdateProps) {
    await api.put("/Todo/" + id, data);
  }

  const { mutateAsync: mutateAsyncUpdate, isPending: isLoadingUpdate } =
    useMutation({
      mutationFn: handleRequest,
      onSuccess: () => {
        notifyUpdate();
        queryClient.invalidateQueries({
          queryKey: query,
        });
      },
      onError: extractError,
    });

  return {
    mutateAsyncUpdate,
    isLoadingUpdate,
  };
}

function useTodoToggleTodo() {
  const queryClient = useQueryClient();

  async function handleRequest(id: string) {
    await api.patch("/Todo/ToggleTodo/" + id);
  }

  const { mutateAsync: mutateAsyncToggleTodo, isPending: isLoadingToggleTodo } =
    useMutation({
      mutationFn: handleRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: query,
        });
      },
      onError: extractError,
    });

  return {
    mutateAsyncToggleTodo,
    isLoadingToggleTodo,
  };
}

function useTodoRemove() {
  const queryClient = useQueryClient();

  async function handleRequest(id: string) {
    await api.delete("/Todo/" + id);
  }

  const { mutateAsync: mutateAsyncRemove, isPending: isLoadingRemove } =
    useMutation({
      mutationFn: handleRequest,
      onSuccess: () => {
        notifyRemove();
        queryClient.invalidateQueries({
          queryKey: query,
        });
      },
      onError: extractError,
    });

  return {
    mutateAsyncRemove,
    isLoadingRemove,
  };
}

export {
  useTodoGetAll,
  useTodoCreate,
  useTodoUpdate,
  useTodoToggleTodo,
  useTodoRemove,
};
