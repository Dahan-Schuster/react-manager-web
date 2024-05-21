import { Delete, Edit } from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { FC, Fragment, memo, useCallback, useState } from "react";
import FormPerfil from "./FormPerfil";
import CustomDialog from "../../components/CustomDialog";
import Button from "@mui/material/Button";
import { usePerfis } from "../../contexts/PerfisContext";
import { toast } from "react-toastify";
import Icon from "@mui/material/Icon";

interface ColunaNomePerfilProps {
  perfil: Perfis.PerfilType;
}

/**
 *  Coluna da tabela de módulos x perfis x permissões com o nome do perfil
 *  e evento de clique para editar ou deletar o perfil
 */
const ColunaNomePerfil: FC<ColunaNomePerfilProps> = memo(({ perfil }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const [openFormPerfil, setOpenFormPerfil] = useState<boolean>(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);

  const { deletarPerfil } = usePerfis();

  const [loading, setLoading] = useState<boolean>(false);
  const handleDelete = useCallback(() => {
    deletarPerfil(perfil.id)
      .then((res) => {
        if (res.success) {
          toast.success("Perfil deletado com sucesso!");
          setOpenConfirmDelete(false);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Fragment>
      <Typography
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          "&:hover": { textDecoration: "underline" },
        }}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        {perfil.nome}
        <Icon fontSize="inherit">more_vert</Icon>
      </Typography>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setOpenFormPerfil(true)}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Renomear</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setOpenConfirmDelete(true)}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Deletar</ListItemText>
        </MenuItem>
      </Menu>

      <FormPerfil
        perfil={perfil}
        open={openFormPerfil}
        setOpen={setOpenFormPerfil}
      />

      <CustomDialog
        title="Confirmar deleção?"
        open={openConfirmDelete}
        onCloseClick={() => setOpenConfirmDelete(false)}
        actions={[
          <Button
            disabled={loading}
            onClick={loading ? undefined : handleDelete}
            color="warning"
            variant="contained"
          >
            Sim, deletar
          </Button>,
        ]}
      >
        <Typography>
          Tem certeza que deseja deletar o perfil <b>{perfil.nome}</b>? Todos os
          usuários relacionados ao perfil perderão suas permissões. Esta ação é
          irreversível.
        </Typography>
      </CustomDialog>
    </Fragment>
  );
});

export default ColunaNomePerfil;
