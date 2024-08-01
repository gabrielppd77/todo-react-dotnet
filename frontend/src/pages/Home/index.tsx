import React from "react";

import { Button, Stack } from "@mui/material";

import DataTable from "@components/DataTable";
import PageHeader from "@components/PageHeader";

import { useTodoGetAll } from "@libs/queries/todo";
import Form from "./Form";

export default function Home() {
  const [isOpenForm, setOpenForm] = React.useState(false);

  const { data: _data, isLoading, isFetching } = useTodoGetAll();
  const data = _data || [];

  return (
    <Stack p={2} gap={1}>
      <PageHeader
        title="Tarefas"
        renderRight={
          <Button variant="contained" onClick={() => setOpenForm(true)}>
            Adicionar
          </Button>
        }
      />

      <DataTable
        data={data}
        columns={[
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
          },
          {
            name: "id",
            label: "Status",
          },
          {
            name: "id",
            label: "Ações",
          },
        ]}
        isLoading={isLoading}
        isFetching={isFetching}
      />

      {isOpenForm && (
        <Form isOpen={isOpenForm} onClose={() => setOpenForm(false)} />
      )}
    </Stack>
  );
}
