import { FC, Fragment, useEffect, useState } from "react";
import config from "../../config";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface LoginTemaProps {
  tema: Mui.Theme;
  file: File | null;
}

/**
 * Container de previsualização da logo de login do tema em edição
 */
const LoginTema: FC<LoginTemaProps> = ({ tema, file }) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else if (tema.url_logo_login) {
      setUrl(config.apiBaseUrl + tema.url_logo_login);
    } else if (tema.url_logo_header) {
      setUrl(config.apiBaseUrl + tema.url_logo_header);
    } else {
      setUrl("");
    }
  }, [file, tema.url_logo_header, tema.url_logo_login]);

  return (
    <Fragment>
      <Typography variant="h6" color="text.secodary">
        Login
      </Typography>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!url && (
          <Typography color="text.primary">
            Selecione uma imagem de logo de login ou padrão
          </Typography>
        )}
        {!!url && (
          <img
            src={url}
            alt="Logo"
            style={{ width: "300px", maxHeight: "100px", objectFit: "cover" }}
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
          <h2>Login</h2>
          <Box sx={{ mt: 1 }}>
            <TextField margin="normal" fullWidth placeholder="E-mail" />
            <TextField
              margin="normal"
              fullWidth
              placeholder="Senha"
              type="password"
            />
            <Button
              color="primary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
          </Box>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default LoginTema;
