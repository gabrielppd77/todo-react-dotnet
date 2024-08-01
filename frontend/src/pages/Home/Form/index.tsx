import { Grid } from "@mui/material";

import ActionDialog from "@components/ActionDialog";
import TextFieldControl from "@components/TextFieldControl";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { useTodoCreate, useTodoUpdate } from "@libs/queries/todo";

import { TodoResponseDTO } from "@libs/queries/todo/dtos/TodoResponseDTO";

const schema = z.object({
  title: z.string().min(1, { message: "Informe o Título" }),
  description: z.string().min(1, { message: "Informe a Descrição" }),
});

interface FormProps {
  isOpen: boolean;
  onClose: () => void;
  data: TodoResponseDTO | null;
}

export default function Form({ isOpen, onClose, data: _data }: FormProps) {
  const { mutateAsyncCreate, isLoadingCreate } = useTodoCreate();
  const { mutateAsyncUpdate, isLoadingUpdate } = useTodoUpdate();
  const isLoading = isLoadingCreate || isLoadingUpdate;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: _data || {
      title: "",
      description: "",
    },
  });

  return (
    <ActionDialog
      title="Cadastro de Tarefa"
      maxWidth="xs"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={form.handleSubmit(async (data) => {
        if (_data) {
          await mutateAsyncUpdate({
            data,
            id: _data.id,
          });
        } else {
          await mutateAsyncCreate(data);
        }
        onClose();
      })}
      isLoading={isLoading}
    >
      <FormProvider {...form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextFieldControl
              name="title"
              required
              fullWidth
              label="Título"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldControl
              name="description"
              required
              fullWidth
              label="Descrição"
            />
          </Grid>
        </Grid>
      </FormProvider>
    </ActionDialog>
  );
}
