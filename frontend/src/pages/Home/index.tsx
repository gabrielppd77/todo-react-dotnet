import React from "react";

import { Box, Button, IconButton, Stack } from "@mui/material";
import {
  CheckCircle,
  CheckCircleOutline,
  Delete,
  Edit,
} from "@mui/icons-material";

import DataTable from "@components/DataTable";
import PageHeader from "@components/PageHeader";

import Form from "./Form";

import {
  useTodoGetAll,
  useTodoRemove,
  useTodoToggleTodo,
} from "@libs/queries/todo";
import { confirmDelete } from "@libs/alert";

import { TodoResponseDTO } from "@libs/queries/todo/dtos/TodoResponseDTO";

function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default function Home() {
  const [dataForm, setDataForm] = React.useState<{
    data: TodoResponseDTO | null;
    isOpen: boolean;
  }>({
    data: null,
    isOpen: false,
  });

  const { mutateAsyncToggleTodo, isLoadingToggleTodo } = useTodoToggleTodo();
  const { mutateAsyncRemove } = useTodoRemove();

  const { data: _data, isLoading, isFetching } = useTodoGetAll();
  const data = _data || [];

  return (
    <Stack p={2} gap={1}>
      <PageHeader
        title="Tarefas"
        renderRight={
          <Button
            variant="contained"
            onClick={() =>
              setDataForm({
                data: null,
                isOpen: true,
              })
            }
          >
            Adicionar
          </Button>
        }
      />

      <DataTable
        data={data}
        columns={[
          {
            name: "id",
            label: "Status",
            options: {
              customBodyRender: (value) => {
                const rowCurrent = data.find((d) => d.id === value);
                if (rowCurrent) {
                  return (
                    <IconButton
                      color={rowCurrent.isConcluded ? "success" : "default"}
                      onClick={async () => await mutateAsyncToggleTodo(value)}
                    >
                      {rowCurrent.isConcluded ? (
                        <CheckCircle />
                      ) : (
                        <CheckCircleOutline />
                      )}
                    </IconButton>
                  );
                }
              },
            },
          },
          {
            name: "title",
            label: "Título",
          },
          {
            name: "description",
            label: "Descrição",
          },
          {
            name: "updatedAt",
            label: "Última Atualização",
            options: {
              customBodyRender: formatDate,
            },
          },
          {
            name: "id",
            label: "Ações",
            options: {
              customBodyRender: (value) => {
                return (
                  <Box>
                    <IconButton
                      onClick={() => {
                        const rowCurrent = data.find((d) => d.id === value);
                        if (rowCurrent) {
                          setDataForm({
                            data: rowCurrent,
                            isOpen: true,
                          });
                        }
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        confirmDelete(
                          async () => await mutateAsyncRemove(value)
                        )
                      }
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                );
              },
            },
          },
        ]}
        isLoading={isLoading}
        isFetching={isFetching || isLoadingToggleTodo}
      />

      {dataForm.isOpen && (
        <Form
          isOpen={dataForm.isOpen}
          data={dataForm.data}
          onClose={() =>
            setDataForm({
              data: null,
              isOpen: false,
            })
          }
        />
      )}
    </Stack>
  );
}
