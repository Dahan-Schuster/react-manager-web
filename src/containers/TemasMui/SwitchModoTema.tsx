import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { Dispatch, FC, SetStateAction } from "react";

interface SwitchModoTemaProps {
  tema: Mui.Theme;
  setTema: Dispatch<SetStateAction<Mui.Theme>>;
}

const SwitchModoTema: FC<SwitchModoTemaProps> = ({ tema, setTema }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "56px",
      }}
    >
      <Typography sx={{ flex: 1 }}>Modo do tema</Typography>
      <Typography sx={{ color: tema.mui_mode === "light" ? "#fff" : "#ddd" }}>
        Claro
      </Typography>
      <Switch
        checked={tema.mui_mode === "dark"}
        onChange={() =>
          setTema((prev) => ({
            ...prev,
            mui_mode: prev.mui_mode === "dark" ? "light" : "dark",
          }))
        }
        inputProps={{ "aria-label": "controlled" }}
      />
      <Typography sx={{ color: tema.mui_mode === "dark" ? "#fff" : "#ddd" }}>
        Escuro
      </Typography>
    </Box>
  );
};

export default SwitchModoTema;
