import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FC } from "react";
import BoxCorPaleta from "./BoxCorPaleta";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";

interface CardTemaProps {
  item: Mui.Theme;
}

/**
 * Item da listagem de temas MUI
 */
const CardTema: FC<CardTemaProps> = ({ item }) => {
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
        <Typography>{item.nome}</Typography>
        <IconButton>
          <Edit />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default CardTema;
