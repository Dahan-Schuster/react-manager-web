import { FC } from "react";
import { MuiThemeProvider } from "../contexts/MuiThemeContext";
import Paper from "@mui/material/Paper";

/**
 * Página raiz que engloba o restante das páginas
 */
const RootPage: FC = () => {
  return (
    <MuiThemeProvider>
      <Paper>Root</Paper>
    </MuiThemeProvider>
  );
};

export default RootPage;
