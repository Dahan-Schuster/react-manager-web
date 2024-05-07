import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { FC, Fragment, useEffect, useState } from "react";
import config from "../../config";
import { ImageNotSupported } from "@mui/icons-material";

interface BoxFaviconTemaProps {
  tema: Mui.Theme;
  file: File | null;
}

/**
 * Visualização do favicon do tema em edição
 */
const BoxFaviconTema: FC<BoxFaviconTemaProps> = ({ tema, file }) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else if (tema.url_favicon) {
      setUrl(config.apiBaseUrl + tema.url_favicon);
    } else {
      setUrl("");
    }
  }, [file, tema.url_favicon]);

  return (
    <Fragment>
      <Typography variant="h6" color="text.secodary">
        Favicon
      </Typography>
      <Box
        component={Paper}
        sx={{
          width: "100%",
          maxWidth: "200px",
          borderRadius: "8px",
          height: "48px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 1,
          p: 1,
        }}
      >
        {!url && <ImageNotSupported />}
        {!!url && (
          <img
            src={url}
            alt="Favicon"
            style={{ width: "24px", height: "24px" }}
          />
        )}
        <Typography sx={{ color: "text.secondary" }}>
          {config.appTitle}
        </Typography>
      </Box>
    </Fragment>
  );
};

export default BoxFaviconTema;
