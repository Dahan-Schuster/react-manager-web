import { FC, useMemo, useState } from "react";
import MainLayout from "../../containers/Common/MainLayout";
import useAxios from "../../services/useAxios";
import useDebounceEffect from "../../hooks/useDebonceEffect";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { defaultTablePageSize, tablePageSizes } from "../../constants";

interface LogsPageProps {}

/**
 * Listagem de logs do sistema
 */
const LogsPage: FC<LogsPageProps> = () => {
  const { makeRequest } = useAxios();
  const [logs, setLogs] = useState<Sistema.LogType[]>([]);
  const [logsPagination, setLogsPagination] =
    useState<Common.AdonisPaginationType>();

  const [loading, setLoading] = useState<boolean>(false);

  /** Objeto de paginação da tabela */
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultTablePageSize,
  });

  useDebounceEffect(() => {
    setLoading(true);
    makeRequest({
      method: "get",
      url: "sistema/logs",
      pagination: paginationModel,
    })
      .then((response) => {
        if (response.success) {
          const logs = response.logs as {
            data: Sistema.LogType[];
            meta: Common.AdonisPaginationType;
          };
          setLogs(logs.data as Sistema.LogType[]);
          setLogsPagination(logs.meta);
        }
      })
      .finally(() => setLoading(false));
  }, [paginationModel]);

  const logsTableColumns = useMemo<GridColDef<Sistema.LogType>[]>(
    () => [
      { field: "id", headerName: "ID", width: 100, editable: false },
      {
        field: "dados",
        headerName: "Nome do paciente",
        flex: 1,
        editable: false,
        valueGetter: (value) => (value as Users.UserType).nome || "",
      },
      {
        field: "origem",
        headerName: "Origem",
        minWidth: 120,
        editable: false,
      },
      {
        field: "evento",
        headerName: "Evento",
        minWidth: 200,
        editable: false,
      },
      {
        field: "user_id",
        headerName: "Usuário responsável",
        flex: 1,
        minWidth: 120,
        editable: false,
        valueGetter: (value, row) => {
          if (!value) {
            return "---";
          }

          return row.user?.nome || value;
        },
      },
    ],
    []
  );

  return (
    <MainLayout title="Logs">
      <DataGrid
        rows={logs || []}
        rowSelection={false}
        columns={logsTableColumns}
        paginationMode="server"
        rowCount={logsPagination?.total || 0}
        loading={loading}
        pageSizeOptions={tablePageSizes}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        slotProps={{
          loadingOverlay: { sx: { height: "5px" } },
        }}
      />
    </MainLayout>
  );
};

export default LogsPage;
