import React from "react";

import {
  Box,
  CircularProgress,
  LinearProgress,
  Paper,
  TableCell,
  TableRow,
} from "@mui/material";

import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";

interface DataTableExpandableProps {
  renderExpandableRow: (dataIndex: number) => React.ReactNode;
}

export type DataTableColumn = MUIDataTableColumnDef;

interface DataTableProps {
  data: Array<object | number[] | string[]>;
  columns: DataTableColumn[];
  isLoading?: boolean;
  isFetching?: boolean;
  pagination?: boolean;
  expandable?: DataTableExpandableProps;
}

export default function DataTable({
  data,
  columns,
  isLoading,
  isFetching,
  pagination,
  expandable,
}: DataTableProps) {
  const [rowsExpanded, setRowsExpanded] = React.useState<number[]>([]);

  return (
    <Paper>
      <Box sx={{ height: 4 }}>{isFetching && <LinearProgress />}</Box>
      <MUIDataTable
        title=""
        data={data}
        columns={columns}
        options={{
          elevation: 0,
          pagination,
          download: false,
          print: false,
          filter: false,
          search: false,
          viewColumns: false,
          responsive: "simple",
          selectableRows: "none",
          selectToolbarPlacement: "none",
          textLabels: {
            body: {
              noMatch: isLoading ? (
                <CircularProgress />
              ) : (
                "Desculpe, não foi possível encontrar os registros"
              ),
              toolTip: "Ordernar",
              columnHeaderTooltip: (column) => `Ordernar por ${column.label}`,
            },
            pagination: {
              next: "Próxima Página",
              previous: "Página Anterior",
              rowsPerPage: "Linhas por Página:",
              displayRows: "de",
            },
          },
          expandableRows: expandable ? true : undefined,
          expandableRowsOnClick: false,
          expandableRowsHeader: false,
          rowsExpanded,
          onRowExpansionChange: (currentRowsExpanded) => {
            const { dataIndex } = currentRowsExpanded[0];
            setRowsExpanded((prev) =>
              prev.some((d) => d === dataIndex) ? [] : [dataIndex]
            );
          },
          renderExpandableRow: expandable
            ? (rowData, { dataIndex }) => (
                <TableRow>
                  <TableCell
                    padding={"none"}
                    colSpan={rowData.length + 1}
                    sx={{
                      backgroundColor: "action.selected",
                    }}
                  >
                    {expandable.renderExpandableRow(dataIndex)}
                  </TableCell>
                </TableRow>
              )
            : undefined,
        }}
      />
    </Paper>
  );
}
