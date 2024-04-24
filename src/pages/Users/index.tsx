import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import React, { FC, useMemo, useState } from "react";
import LoadingOverlay from "../../components/LoadingOverlay";
import usePageTitle from "../../hooks/usePageTitle";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRenderEditCellParams,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridSlots,
  GridToolbar,
  useGridApiContext,
} from "@mui/x-data-grid";

import ConfirmDialog from "../../components/ConfirmDialog";
import { defaultTablePageSize, tablePageSizes } from "../../constants";
import CreateUserButton from "../../containers/Users/CreateUserButton";
import { SelectInputProps } from "../../components/SelectInput";
import useDebounceEffect from "../../hooks/useDebonceEffect";
import { useUsers } from "../../contexts/UsersContext";
import { toast } from "react-toastify";
import SelectPerfil from "../../containers/Perfis/SelectPerfil";
import MainLayout from "../../containers/Common/MainLayout";
import SelectStatus from "../../containers/Users/SelectStatus";
import UsersNoRowsOverlay from "../../containers/Users/NoRowsOverlay";
import Switch from "@mui/material/Switch";
import useUserPermissions from "../../hooks/useUserPermissions";
import { useAuth } from "../../contexts/AuthContext";

interface UsersProps {}

/**
 * Página de CRUD de usuários
 * Utiliza a DataGrid do @mui/x-data-grid
 *
 * @see https://mui.com/x/react-data-grid/
 */
const Users: React.FunctionComponent<UsersProps> = () => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  const { user } = useAuth();
  const { has } = useUserPermissions();
  const podeAlterarStatus = has("usuarios-alterar-status");

  const {
    getUsers,
    deleteUser,
    updateUser,
    changeStatusUser,
    usersError,
    loadingUsers,
    users,
    usersPagination,
  } = useUsers();

  /** Define o modo das linhas da tabela: edição ou visualização */
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  /** Objeto de paginação da tabela */
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultTablePageSize,
  });

  /** Objeto usado para filtrar a lista */
  const [searchFilters, setSearchFilters] = React.useState<
    Partial<Users.GetUsersFilters>
  >({
    nome: "",
    email: "",
    perfilId: 0,
    status: "",
  });

  useDebounceEffect(
    () => {
      getUsers({ ...paginationModel, ...searchFilters });
    },
    [paginationModel, searchFilters],
    500
  );

  /**
   * Evento chamado ao sair do modo de edição de uma linha
   * Impede de sair do modo caso o motivo seja perda de foco
   * Isto garante que para salvar será preciso clicar no botão 'Salvar'
   */
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  /** Evento chamado ao confirmar a deleção de um usuário */
  const onConfirmDelete = React.useCallback(async () => {
    await deleteUser(idToDelete!);
    setOpenConfirmDialog(false);
    setIdToDelete(null);
  }, [deleteUser, idToDelete]);

  /** Evento chamado ao clicar no botão de deleção (coluna de ações da tabela) */
  const handleDeleteClick = React.useCallback((id: number) => {
    setIdToDelete(id);
    setOpenConfirmDialog(true);
  }, []);

  const handleStatusChange = React.useCallback(async (id: number) => {
    changeStatusUser(id);
  }, []);

  /**
   * Evento chamado pela DataGrid quando uma edição é cancelada
   * Retorna a linha para o modo de visualização
   */
  const handleCancelClick = React.useCallback(
    (id: GridRowId) => () => {
      setRowModesModel((model) => ({
        ...model,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      }));
    },
    []
  );

  /**
   * Evento chamado ao clicar no botão de edição (coluna de ações da tabela)
   * Atualiza o estado, alterando o modo de exibição da linha
   */
  const handleEditClick = React.useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    },
    [rowModesModel]
  );

  /**
   * Evento chamado ao clicar no botão de salvar edição (coluna de ações da tabela)
   * Atualiza o estado, disparando o evento `processRowUpdate`
   */
  const handleSaveClick = React.useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    },
    [rowModesModel]
  );

  /**
   * Evento chamado pela DataGrid quando uma linha é editada
   * O método valida nome e email, envia os dados para o servidor
   * e mostra mensagem de sucesso
   * A lista de usuários é atualizada no contexto usando o `updateUser`
   */
  const processRowUpdate = React.useCallback(
    async (newRow: GridRowModel<Users.UserType>) => {
      if (!newRow.nome || !newRow.email) {
        throw new Error("Nome e e-mail são obrigatórios");
      }

      const response = await updateUser(newRow);
      return { ...newRow, ...response.user };
    },
    [updateUser]
  );

  /**
   * Evento de erro ao chamar a função `processRowUpdate`
   * Mostra mensagem de erro ao usuário
   */
  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    toast.error(error.message);
  }, []);

  /**
   * Evento chamado ao mudar o modo de uma linha
   * Atualiza o estado
   */
  const handleRowModesModelChange = React.useCallback(
    (newRowModesModel: GridRowModesModel) => {
      setRowModesModel(newRowModesModel);
    },
    []
  );

  const usersTableColumns = useMemo<GridColDef<Users.UserType>[]>(
    () => [
      { field: "id", headerName: "ID", width: 100, editable: false },
      {
        field: "nome",
        headerName: "Nome",
        flex: 1,
        editable: true,
      },
      {
        field: "email",
        headerName: "E-mail",
        flex: 1,
        minWidth: 250,
        editable: true,
      },
      {
        field: "perfil_id",
        headerName: "Perfil",
        maxWidth: 100,
        editable: false,
        valueGetter: (value, row) => {
          if (!value) {
            return "";
          }

          return row.perfil?.nome || value;
        },
      },
      {
        field: "status",
        headerName: "Status",
        maxWidth: 100,
        editable: false,
        type: "actions",
        getActions: ({ id, row }) => {
          return [
            <Switch
              disabled={!podeAlterarStatus || row.id === user?.id}
              checked={!!row.status}
              onChange={
                podeAlterarStatus ? () => handleStatusChange(row.id) : undefined
              }
              inputProps={{ "aria-label": "controlled" }}
            />,
          ];
        },
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Ações",
        minWidth: 150,
        cellClassName: "actions",
        getActions: ({ id, row }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: "primary.main",
                }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => handleDeleteClick(row.id)}
              color="secondary"
            />,
          ];
        },
      },
    ],
    [
      handleCancelClick,
      handleDeleteClick,
      handleEditClick,
      handleSaveClick,
      rowModesModel,
    ]
  );

  const handleSearchInput = React.useCallback(
    (e: { target: { value: string | unknown } }, key: string) => {
      setSearchFilters((filters) => ({ ...filters, [key]: e.target.value }));
    },
    []
  );

  return (
    <MainLayout title="Usuários" hideTitle={true}>
      <Grid container spacing={2} justifyContent={"space-between"}>
        <Grid item xs={6}>
          {usersError}
        </Grid>
        <Grid item xs={6}>
          <CreateUserButton />
        </Grid>
      </Grid>
      {/* Mostra o overlay apenas se não tiverem usuários carregados */}
      {loadingUsers && !users.length && <LoadingOverlay open />}
      <Box mt={2}>
        <Grid container spacing={1} mb={2}>
          <Grid item xs={3}>
            <SelectPerfil
              margin="none"
              optional
              emptyLabel="Todos"
              label="Perfil"
              value={searchFilters.perfilId}
              onChange={(e) => handleSearchInput(e, "perfilId")}
            />
          </Grid>
          <Grid item xs={3}>
            <SelectStatus
              margin="none"
              optional
              emptyValue=""
              label="Status"
              value={searchFilters.status}
              onChange={(e) => handleSearchInput(e, "status")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              margin="none"
              fullWidth
              label="E-mail"
              autoComplete="off"
              size="small"
              value={searchFilters.email}
              onChange={(e) => handleSearchInput(e, "email")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              margin="none"
              fullWidth
              label="Nome"
              autoComplete="off"
              size="small"
              value={searchFilters.nome}
              onChange={(e) => handleSearchInput(e, "name")}
            />
          </Grid>
        </Grid>
        <DataGrid
          sx={{ fontSize: 16 }}
          rows={users}
          rowSelection={false}
          editMode="row"
          columns={usersTableColumns}
          paginationMode="server"
          rowCount={usersPagination?.total || 0}
          loading={loadingUsers}
          pageSizeOptions={tablePageSizes}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          slots={{
            ...(users.length
              ? {
                  loadingOverlay: LinearProgress as GridSlots["loadingOverlay"],
                }
              : null),
            toolbar: GridToolbar,
            noRowsOverlay: UsersNoRowsOverlay,
            noResultsOverlay: UsersNoRowsOverlay,
          }}
          slotProps={{
            toolbar: { showQuickFilter: false },
          }}
        />
      </Box>
      <ConfirmDialog
        title="Confirmar deleção"
        text="Deseja realmente excluir este usuário? Esta ação é permanente."
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={onConfirmDelete}
      />
    </MainLayout>
  );
};

/**
 * Container para o selects usados na tabela de usuários
 */
const SelectDataGrid: React.FunctionComponent<
  GridRenderEditCellParams & { SelectComponent: FC<SelectInputProps> }
> = ({ id, field, value, isProcessingProps, SelectComponent }) => {
  const apiRef = useGridApiContext();

  const handleValueChange = (event: SelectChangeEvent<unknown>) => {
    const newValue = event.target.value;
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  return (
    <SelectComponent
      value={value}
      onChange={handleValueChange}
      disabled={isProcessingProps}
    />
  );
};

export default Users;
