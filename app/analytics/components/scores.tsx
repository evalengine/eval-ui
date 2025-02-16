"use client";

import { useAllScores } from "@/hooks/use-all-scores";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { DataGrid } from "@mui/x-data-grid";
import { useEvaluationDialog } from "@/hooks/use-evaluation-dialog";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function Scores() {
  const { data: allScores, isLoading: isLoadingAllScores } = useAllScores();
  const [showEvaluationDialog, hideEvaluationDialog] = useEvaluationDialog();

  return (
    <>
      <div className="h-[40rem]">
        <ThemeProvider theme={theme}>
          <DataGrid
            autoPageSize
            pagination
            columns={[
              {
                field: "original_tweet",
                headerName: "Original Tweet",
                headerClassName: "capitalize",
                flex: 1,
                minWidth: 100,
              },
              {
                field: "responded_tweet",
                headerName: "Responded Tweet",
                headerClassName: "capitalize",
                flex: 1,
                minWidth: 100,
              },
              {
                field: "recommended_response",
                headerName: "Recommended Response",
                headerClassName: "capitalize",
                flex: 1,
                minWidth: 100,
              },
              {
                field: "final_score",
                headerName: "Final Score",
                headerClassName: "capitalize",
                flex: 1,
                minWidth: 50,
              },
            ]}
            rows={allScores?.scores || []}
            loading={isLoadingAllScores}
            // density="compact"
            sx={{
              borderColor: "hsl(var(--border))",
              "--rowBorderColor": "hsl(var(--border))",
              // ".MuiDataGrid-columnHeader": {
              //   borderBottom: "none"
              // },
              "*": {
                borderColor: "hsl(var(--border))!important",
              },
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
            }}
            disableRowSelectionOnClick
            disableMultipleRowSelection
            checkboxSelection={false}
            disableColumnSelector
            className="border!"
            getRowClassName={(params) => {
              return "cursor-pointer";
            }}
            onRowClick={(params) => {
              showEvaluationDialog({ result: params.row });
            }}
          />
        </ThemeProvider>
      </div>
    </>
  );
}
