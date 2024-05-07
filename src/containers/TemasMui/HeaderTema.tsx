import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import { FC, Fragment, useEffect, useState } from "react";
import config from "../../config";
import { appBarMinHeight } from "../../constants";
import Typography from "@mui/material/Typography";

interface HeaderTemaProps {
  tema: Mui.Theme;
  file: File | null;
}

/**
 * AppBar de previsualização da logo do tema em edição
 */
const HeaderTema: FC<HeaderTemaProps> = ({ tema, file }) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else if (tema.url_logo_header) {
      setUrl(config.apiBaseUrl + tema.url_logo_header);
    } else {
      setUrl("");
    }
  }, [file, tema.url_logo_header]);

  return (
    <Fragment>
      <Typography variant="h6" color="text.secodary">
        Cabeçalho
      </Typography>
      <Toolbar
        sx={(theme) => ({
          backgroundColor: tema?.cor_header || theme.palette.primary.main,
        })}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            item
            xs={12}
          >
            {!url && (
              <Typography color="text.primary">
                Selecione uma imagem de logo padrão
              </Typography>
            )}
            {!!url && (
              <img
                src={url}
                alt="logo"
                style={{
                  width: "200px",
                  maxHeight: appBarMinHeight,
                  objectFit: "cover",
                  padding: 4,
                }}
              />
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </Fragment>
  );
};

export default HeaderTema;
