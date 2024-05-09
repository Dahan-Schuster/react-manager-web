import MoreVert from "@mui/icons-material/MoreVert";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMuiTheme } from "../../contexts/MuiThemeContext";
import { useTemasMui } from "../../contexts/TemasMuiContext";
import useUserPermissions from "../../hooks/useUserPermissions";
import BoxCorPaleta from "./BoxCorPaleta";
import CustomDialog from "../../components/CustomDialog";
import Button from "@mui/material/Button";
import { MuiModesNames } from "../../constants";

interface CardTemaProps {
  item: Mui.Theme;
}

/**
 * Item da listagem de temas MUI
 */
const CardTema: FC<CardTemaProps> = ({ item }) => {
  const navigate = useNavigate();
  const { has, hasOne } = useUserPermissions();
  const { ativarTema, deletarTema } = useTemasMui();
  const { fetchTema, temaAtivo } = useMuiTheme();
  const [loading, setLoading] = useState(false);

  const [actionConfirm, setActionConfirm] = useState<
    "ativar" | "deletar" | null
  >(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleAtivarTema = useCallback(() => {
    setLoading(true);
    ativarTema(item)
      .then((response) => {
        if (response.success) {
          toast.success("Novo tema definido como ativo!");
          temaAtivo?.mui_mode === item.mui_mode && fetchTema(item.mui_mode);
          setActionConfirm(null);
        }
      })
      .finally(() => setLoading(false));
  }, [temaAtivo]);

  const handleDeletarTema = useCallback(() => {
    setLoading(true);
    deletarTema(item)
      .then((response) => {
        if (response.success) {
          toast.success("Tema deletado com sucesso!");
          setActionConfirm(null);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleOkConfirm = useCallback(() => {
    if (actionConfirm === "ativar") {
      handleAtivarTema();
    } else if (actionConfirm === "deletar") {
      handleDeletarTema();
    }
  }, [actionConfirm, item]);

  return (
    <Paper
      sx={{
        borderRadius: 2,
        backgroundColor: (theme) => theme.palette.background.paper,
        overflow: "hidden",
      }}
    >
      <ContainerCoresTema tema={item} />
      <Box
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography flex={1} display="inline-flex" alignItems="center" gap={1}>
          {item.mui_mode === "light" ? <LightMode /> : <DarkMode />}
          {item.nome}
        </Typography>
        {has("temas-alterar-status") && (
          <Tooltip
            title={
              item.ativo ? "Ative outro tema para substituir o atual" : "Ativar"
            }
          >
            {/* tooltips não são mostrados para itens inativos, a menos que tenha um elemeto como span em volta */}
            <span>
              <Switch
                checked={!!item.ativo}
                disabled={!!item.ativo || loading}
                onChange={() => {
                  setActionConfirm("ativar");
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            </span>
          </Tooltip>
        )}
        {hasOne(["temas-editar", "tema-deletar"]) && (
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
            <MoreVert />
          </IconButton>
        )}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setAnchorEl(null)}
      >
        {has("temas-editar") && (
          <MenuItem onClick={() => navigate(`/temas/editar/${item.id}`)}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem>
        )}
        {has("temas-deletar") && (
          <MenuItem
            onClick={() => {
              setActionConfirm("deletar");
            }}
          >
            <ListItemIcon>
              <Delete fontSize="small" />
            </ListItemIcon>
            <ListItemText>Deletar</ListItemText>
          </MenuItem>
        )}
      </Menu>

      <CustomDialog
        title="Confirma a ação?"
        open={!!actionConfirm}
        onCloseClick={() => {
          setActionConfirm(null);
        }}
        closeLabel="Cancelar"
        actions={[
          <Button
            disabled={loading}
            onClick={handleOkConfirm}
            color={actionConfirm === "deletar" ? "warning" : "primary"}
            variant="contained"
          >
            Sim, {actionConfirm === "ativar" ? "ativar" : "deletar"}
          </Button>,
        ]}
      >
        <Typography>
          {actionConfirm === "deletar" && (
            <>
              Tem certeza que deseja deletar o tema <b>{item.nome}</b>? Esta
              ação é irreversível.
            </>
          )}
          {actionConfirm === "ativar" && (
            <>
              Tem certeza que deseja ativar o tema <b>{item.nome}</b>? O tema{" "}
              <b>{MuiModesNames[item.mui_mode]}</b> ativo atualmente será
              substutuído por este.
            </>
          )}
        </Typography>
      </CustomDialog>
    </Paper>
  );
};

function ContainerCoresTema({ tema }: { tema: Mui.Theme }) {
  return (
    <Grid container>
      <Grid item xs={4}>
        <BoxCorPaleta
          cor={tema.cores_paleta?.primary?.main || "#3f51b5"}
          corLabel={tema.cores_paleta?.primary?.contrastText || "#fff"}
          label="Primária"
        />
      </Grid>
      <Grid item xs={4}>
        <BoxCorPaleta
          cor={tema.cores_paleta?.secondary?.main || "#f50057"}
          corLabel={tema.cores_paleta?.secondary?.contrastText || "#fff"}
          label="Secundária"
        />
      </Grid>
      <Grid item xs={4}>
        <BoxCorPaleta
          cor={tema.cores_paleta?.error?.main || "#f44336"}
          corLabel={tema.cores_paleta?.error?.contrastText || "#fff"}
          label="Erro"
        />
      </Grid>
      <Grid item xs={4}>
        <BoxCorPaleta
          cor={tema.cores_paleta?.warning?.main || "#ff9800"}
          corLabel={tema.cores_paleta?.warning?.contrastText || "#000"}
          label="Atenção"
        />
      </Grid>
      <Grid item xs={4}>
        <BoxCorPaleta
          cor={tema.cores_paleta?.info?.main || "#2196f3"}
          corLabel={tema.cores_paleta?.info?.contrastText || "#000"}
          label="Info"
        />
      </Grid>
      <Grid item xs={4}>
        <BoxCorPaleta
          cor={tema.cores_paleta?.success?.main || "#4caf50"}
          corLabel={tema.cores_paleta?.success?.contrastText || "#fff"}
          label="Sucesso"
        />
      </Grid>
    </Grid>
  );
}

export default CardTema;
