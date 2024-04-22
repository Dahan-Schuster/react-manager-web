import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import React from "react";
import { useMuiTheme } from "../../contexts/MuiThemeContext";

interface AuthContainerProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Container para as páginas de autenticação
 */
const AuthContainer: React.FunctionComponent<AuthContainerProps> = ({
  title,
  children,
}) => {
  const { getUrlLogo } = useMuiTheme();
  const urlLogoLogin = getUrlLogo("login");

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!!urlLogoLogin && (
          <img
            src={urlLogoLogin}
            alt="Logo"
            style={{ width: "300px", height: "auto" }}
          />
        )}
        <Paper
          sx={{
            paddingX: 4,
            paddingY: 2,
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>{title}</h2>
          {children}
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthContainer;
