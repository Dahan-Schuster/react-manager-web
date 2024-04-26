import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { FC, useMemo, useState } from "react";
import LoadingOverlay from "../../components/LoadingOverlay";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderEditCellParams,
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
import SelectPerfil from "../../containers/Perfis/SelectPerfil";
import MainLayout from "../../containers/Common/MainLayout";
import SelectStatus from "../../containers/Users/SelectStatus";
import UsersNoRowsOverlay from "../../containers/Users/NoRowsOverlay";
import Switch from "@mui/material/Switch";
import useUserPermissions from "../../hooks/useUserPermissions";
import { useAuth } from "../../contexts/AuthContext";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import SaveUserForm from "../../containers/Users/SaveUserForm";

/**
 * Página de CRUD de usuários
 * Utiliza a DataGrid do @mui/x-data-grid
 *
 * @see https://mui.com/x/react-data-grid/
 */
const Users: React.FunctionComponent = () => {
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] =
    useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const handleCloseDialogs = React.useCallback(() => {
    setOpenEditDialog(false);
    setOpenConfirmDeleteDialog(false);
    setIdToDeleteOrEdit(undefined);
  }, []);

  const [idToDeleteOrEdit, setIdToDeleteOrEdit] = useState<number | undefined>(
    undefined
  );

  const { user } = useAuth();
  const { has } = useUserPermissions();
  const podeAlterarStatus = has("usuarios-alterar-status");

  const {
    getUsers,
    deleteUser,
    changeStatusUser,
    usersError,
    loadingUsers,
    users,
    usersPagination,
  } = useUsers();

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

  /** Evento chamado ao confirmar a deleção de um usuário */
  const onConfirmDelete = React.useCallback(async () => {
    const res = await deleteUser(idToDeleteOrEdit!);
    if (res.success) {
      handleCloseDialogs();
    }
  }, [deleteUser, idToDeleteOrEdit]);

  /** Evento chamado ao clicar no botão de deleção (coluna de ações da tabela) */
  const handleDeleteClick = React.useCallback((id: number) => {
    setIdToDeleteOrEdit(id);
    setOpenConfirmDeleteDialog(true);
  }, []);

  /** Evento chamado ao clicar no botão de edição (coluna de ações da tabela) */
  const handleEditClick = React.useCallback((id: number) => {
    setIdToDeleteOrEdit(id);
    setOpenEditDialog(true);
  }, []);

  /** Evento chamado ao alterar o switch de status de um usuário (coluna de ações da tabela) */
  const handleStatusChange = React.useCallback(async (id: number) => {
    changeStatusUser(id);
  }, []);

  const podeEditar = has("usuarios-editar");
  const podeDeletar = has("usuarios-deletar");
  const podeAlterarPerms = has("usuarios-alterar-permissao");

  const usersTableColumns = useMemo<GridColDef<Users.UserType>[]>(
    () => [
      { field: "id", headerName: "ID", width: 100, editable: false },
      {
        field: "nome",
        headerName: "Nome",
        flex: 1,
        editable: false,
      },
      {
        field: "email",
        headerName: "E-mail",
        flex: 1,
        minWidth: 250,
        editable: false,
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
        type: "actions",
        headerName: "Status",
        maxWidth: 100,
        getActions: ({ row }) => {
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
        getActions: ({ row }) => {
          const editar = (
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={() => handleEditClick(row.id)}
              color="inherit"
            />
          );

          const deletar = (
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => handleDeleteClick(row.id)}
              color="secondary"
            />
          );

          const actions = [];
          (podeEditar || podeAlterarPerms) && actions.push(editar);
          podeDeletar && actions.push(deletar);
          return actions;
        },
      },
    ],
    [handleDeleteClick, handleEditClick]
  );

  /** Evento de mudança dos inputs de filtro */
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
          {(has("perfis-listar") || podeAlterarPerms) && (
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
          )}
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
          columns={usersTableColumns}
          paginationMode="server"
          rowCount={usersPagination?.total || 0}
          loading={loadingUsers}
          pageSizeOptions={tablePageSizes}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          slots={{
            loadingOverlay: LinearProgress as GridSlots["loadingOverlay"],
            toolbar: GridToolbar,
            noRowsOverlay: UsersNoRowsOverlay,
            noResultsOverlay: UsersNoRowsOverlay,
          }}
          slotProps={{
            loadingOverlay: { sx: { height: "5px" } },
            toolbar: { showQuickFilter: false },
          }}
        />
      </Box>
      <ConfirmDialog
        title="Confirmar deleção"
        text="Deseja realmente excluir este usuário? Esta ação é permanente."
        open={openConfirmDeleteDialog}
        onClose={handleCloseDialogs}
        onConfirm={onConfirmDelete}
      />

      <Dialog
        open={openEditDialog && !!idToDeleteOrEdit}
        onClose={handleCloseDialogs}
      >
        <DialogTitle>Editar usuário</DialogTitle>
        <DialogContent>
          <SaveUserForm id={idToDeleteOrEdit} closeModal={handleCloseDialogs} />
        </DialogContent>
      </Dialog>
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
