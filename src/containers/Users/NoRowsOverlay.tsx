import Box from "@mui/material/Box";
import { FC } from "react";

interface NoRowsOverlayProps {}

/**
 * Componente renderizado na tabela de usuários quando a lista está vazia
 */
const NoRowsOverlay: FC<NoRowsOverlayProps> = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: 3,
      }}
    >
      Sem usuários
    </Box>
  );
};

export default NoRowsOverlay;
