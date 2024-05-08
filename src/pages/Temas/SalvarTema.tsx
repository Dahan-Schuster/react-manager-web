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
import { toast } from "react-toastify";
import { useTemasMui } from "../../contexts/TemasMuiContext";

interface SalvarTemaProps {}

/**
 * SalvarTema documentation
 */
const SalvarTema: FC<SalvarTemaProps> = () => {
  const { id: strId } = useParams();
  const id = strId ? parseInt(strId) : undefined;

  const [tema, setTema] = useState<Mui.Theme>({
    id,
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

  const [fileFavicon, setFileFavicon] = useState<File | null>(null);
  const [fileLogoHeader, setFileLogoHeader] = useState<File | null>(null);
  const [fileLogoLogin, setFileLogoLogin] = useState<File | null>(null);

  useDebounceEffect(() => {
    if (id) {
      makeRequest({
        url: `/sistema/temas-mui/${id}`,
      }).then(async (response) => {
        const tema = response.tema as Mui.Theme;
        tema?.id === id && setTema(tema);
      });
    }
  }, []);

  const { makeRequest } = useAxios();
  const { setTemas } = useTemasMui();

  const handleSubmit = useCallback(
    async (values: Mui.Theme) => {
      if (!values.nome) {
        toast.error("Informe o nome do tema!");
        return;
      }

      if (!fileFavicon && !values.url_favicon) {
        toast.error("Selecione uma imagem de favicon com extensão .ico");
        return;
      }

      if (!fileLogoHeader && !values.url_logo_header) {
        toast.error("Selecione uma imagem de logo padrão");
        return;
      }

      const formData = new FormData();
      fileFavicon && formData.append("file_favicon", fileFavicon);
      fileLogoHeader && formData.append("file_logo_header", fileLogoHeader);
      fileLogoLogin && formData.append("file_logo_login", fileLogoLogin);

      Object.entries(values).forEach(([key, value]) => {
        if (!values[key as keyof Mui.Theme]) return;
        if (key.startsWith("url")) return;
        if (key === "cores_paleta") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      const response = await makeRequest({
        url: "sistema/temas-mui",
        method: values.id ? "PUT" : "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.success) {
        toast.success("Tema salvo com sucesso!");
        const tema = response.tema as Mui.Theme;
        setTema(tema);
        setTemas((list) => {
          if (!id) return [...list, tema];
          return list.map((t) => (t.id === tema.id ? tema : t));
        });
      }
    },
    [fileFavicon, fileLogoLogin, fileLogoHeader]
  );

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
      <MainLayout
        title={id ? "Editar tema" : "Criar tema"}
        mainContainerMaxWidth="xl"
        paperSx={{ p: 0 }}
      >
        <ThemeProvider theme={themePreview}>
          <Grid container>
            {/* Painel de visualização do tema */}
            <Grid item xs={12} md={9} order={{ xs: 2, md: 1 }} sx={{ p: 2 }}>
              <PanelPrevisualizarTema
                tema={tema}
                fileFavicon={fileFavicon}
                fileLogoHeader={fileLogoHeader}
                fileLogoLogin={fileLogoLogin}
              />
            </Grid>

            {/* Painel de edição do tema */}
            <Grid item xs={12} md={3} order={{ xs: 1, md: 2 }}>
              <PanelEditarTema
                tema={tema}
                setTema={setTema}
                handleSubmit={handleSubmit}
                fileFavicon={fileFavicon}
                setFileFavicon={setFileFavicon}
                fileLogoHeader={fileLogoHeader}
                setFileLogoHeader={setFileLogoHeader}
                fileLogoLogin={fileLogoLogin}
                setFileLogoLogin={setFileLogoLogin}
              />
            </Grid>
          </Grid>
        </ThemeProvider>
      </MainLayout>
    </RequireAuth>
  );
};

export default SalvarTema;
