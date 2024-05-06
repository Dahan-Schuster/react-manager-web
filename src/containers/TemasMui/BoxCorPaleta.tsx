import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";

interface BoxCorPaletaProps {
  cor: string;
  label: string;
  corLabel: string;
}

const BoxCorPaleta: FC<BoxCorPaletaProps> = ({ cor, label, corLabel }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: cor,
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          color: corLabel,
          textAlign: "center",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default BoxCorPaleta;
