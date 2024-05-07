import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FC, useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { MuiDefaultPalette } from "../../constants";
import RequireAuth from "../../containers/Auth/RequireAuth";
import MainLayout from "../../containers/Common/MainLayout";
import PanelEditarTema from "../../containers/TemasMui/PanelEditarTema";
import PanelPrevisualizarTema from "../../containers/TemasMui/PanelPrevisualizarTema";
import useDebounceEffect from "../../hooks/useDebonceEffect";
import useAxios from "../../services/useAxios";

interface SalvarTemaProps {}

/**
 * SalvarTema documentation
 */
const SalvarTema: FC<SalvarTemaProps> = () => {
  const { id } = useParams();
  const { makeRequest } = useAxios();

  const [tema, setTema] = useState<Mui.Theme>({
    ativo: 0,
    nome: "",
    mui_mode: "light",
    url_favicon: "",
    url_logo_header: "",
    url_logo_login: "",
    url_logo_simples: "",
    background_default: "#f0f0f0",
    background_paper: "#ffffff",
    text_primary: "#000000",
    text_secondary: "#000000",
    text_disabled: "#000000",
    cor_header: "",
    cor_texto_header: "#000000",
    cor_menu: "",
    cor_texto_menu: "#000000",
    cores_paleta: MuiDefaultPalette,
  });

  useDebounceEffect(() => {
    if (id) {
      makeRequest({
        url: `/sistema/temas-mui/${id}`,
      }).then((response) => {
        setTema(response.tema as Mui.Theme);
      });
    }
  }, []);

  const handleSubmit = useCallback((values: Mui.Theme) => {
    console.log(values);
  }, []);

  const themePreview = useMemo(
    () =>
      createTheme({
        palette: {
          mode: tema.mui_mode,
          ...tema.cores_paleta,
          background: {
            default: tema.background_default,
            paper: tema.background_paper,
          },
          text: {
            primary: tema.text_primary || "#000000",
            secondary: tema.text_secondary,
            disabled: tema.text_disabled,
          },
        },
      }),
    [tema]
  );

  return (
    <RequireAuth>
      <MainLayout mainContainerMaxWidth="xl" paperSx={{ p: 0 }}>
        <ThemeProvider theme={themePreview}>
          <Grid container>
            {/* Painel de visualização do tema */}
            <Grid item xs={12} md={9} order={{ xs: 2, md: 1 }} sx={{ p: 2 }}>
              <PanelPrevisualizarTema />
            </Grid>

            {/* Painel de edição do tema */}
            <Grid item xs={12} md={3} order={{ xs: 1, md: 2 }}>
              <PanelEditarTema
                tema={tema}
                setTema={setTema}
                handleSubmit={handleSubmit}
              />
            </Grid>
          </Grid>
        </ThemeProvider>
      </MainLayout>
    </RequireAuth>
  );
};

export default SalvarTema;
