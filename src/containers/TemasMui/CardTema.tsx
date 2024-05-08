import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FC, useCallback, useState } from "react";
import BoxCorPaleta from "./BoxCorPaleta";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import useUserPermissions from "../../hooks/useUserPermissions";
import { useTemasMui } from "../../contexts/TemasMuiContext";
import { LightMode, DarkMode } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import { useMuiTheme } from "../../contexts/MuiThemeContext";
import { toast } from "react-toastify";

interface CardTemaProps {
  item: Mui.Theme;
}

/**
 * Item da listagem de temas MUI
 */
const CardTema: FC<CardTemaProps> = ({ item }) => {
  const navigate = useNavigate();
  const { has } = useUserPermissions();
  const { ativarTema, setTemas } = useTemasMui();
  const { fetchTema } = useMuiTheme();
  const [loading, setLoading] = useState(false);

  const handleAtivarTema = useCallback(() => {
    setLoading(true);
    ativarTema(item)
      .then((response) => {
        if (response.success) {
          setTemas(response.temas as Mui.Theme[]);
          toast.success("Novo tema definido como ativo!");
          fetchTema();
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Paper
      sx={{
        borderRadius: 2,
        backgroundColor: (theme) => theme.palette.background.paper,
        overflow: "hidden",
      }}
    >
      <Grid container>
        <Grid item xs={4}>
          <BoxCorPaleta
            cor={item.cores_paleta?.primary?.main || "#3f51b5"}
            corLabel={item.cores_paleta?.primary?.contrastText || "#fff"}
            label="Primária"
          />
        </Grid>
        <Grid item xs={4}>
          <BoxCorPaleta
            cor={item.cores_paleta?.secondary?.main || "#f50057"}
            corLabel={item.cores_paleta?.secondary?.contrastText || "#fff"}
            label="Secundária"
          />
        </Grid>
        <Grid item xs={4}>
          <BoxCorPaleta
            cor={item.cores_paleta?.error?.main || "#f44336"}
            corLabel={item.cores_paleta?.error?.contrastText || "#fff"}
            label="Erro"
          />
        </Grid>
        <Grid item xs={4}>
          <BoxCorPaleta
            cor={item.cores_paleta?.warning?.main || "#ff9800"}
            corLabel={item.cores_paleta?.warning?.contrastText || "#000"}
            label="Atenção"
          />
        </Grid>
        <Grid item xs={4}>
          <BoxCorPaleta
            cor={item.cores_paleta?.info?.main || "#2196f3"}
            corLabel={item.cores_paleta?.info?.contrastText || "#000"}
            label="Info"
          />
        </Grid>
        <Grid item xs={4}>
          <BoxCorPaleta
            cor={item.cores_paleta?.success?.main || "#4caf50"}
            corLabel={item.cores_paleta?.success?.contrastText || "#fff"}
            label="Sucesso"
          />
        </Grid>
      </Grid>
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
                onChange={handleAtivarTema}
                inputProps={{ "aria-label": "controlled" }}
              />
            </span>
          </Tooltip>
        )}
        {has("temas-editar") && (
          <IconButton onClick={() => navigate(`/temas/editar/${item.id}`)}>
            <Edit />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
};

export default CardTema;
