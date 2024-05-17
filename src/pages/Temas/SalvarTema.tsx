import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FC, useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MuiDefaultPalette } from "../../constants";
import MainLayout from "../../containers/Common/MainLayout";
import PanelEditarTema from "../../containers/TemasMui/PanelEditarTema";
import PanelPrevisualizarTema from "../../containers/TemasMui/PanelPrevisualizarTema";
import { useMuiTheme } from "../../contexts/MuiThemeContext";
import { useTemasMui } from "../../contexts/TemasMuiContext";
import useDebounceEffect from "../../hooks/useDebonceEffect";
import useAxios from "../../services/useAxios";

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
    background_default: "",
    background_paper: "",
    text_primary: "",
    text_secondary: "",
    text_disabled: "",
    cor_header: "",
    cor_texto_header: "",
    cor_menu: "",
    cor_texto_menu: "",
    cores_paleta: MuiDefaultPalette,
  });

  const [fileFavicon, setFileFavicon] = useState<File | null>(null);
  const [fileLogoHeader, setFileLogoHeader] = useState<File | null>(null);
  const [fileLogoLogin, setFileLogoLogin] = useState<File | null>(null);
  const [fileLogoSimples, setFileLogoSimples] = useState<File | null>(null);

  useDebounceEffect(() => {
    if (id) {
      setLoading(true);
      makeRequest({
        url: `/sistema/temas-mui/${id}`,
      })
        .then(async (response) => {
          const tema = response.tema as Mui.Theme;
          tema?.id === id && setTema(tema);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const { makeRequest } = useAxios();
  const { setTemas } = useTemasMui();
  const { fetchTema } = useMuiTheme();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
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
      fileLogoSimples && formData.append("file_logo_simples", fileLogoSimples);

      Object.entries(values).forEach(([key, value]) => {
        if (!values[key as keyof Mui.Theme]) return;
        if (key.startsWith("url")) return;
        if (key === "cores_paleta") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      setLoading(true);
      const response = await makeRequest({
        url: "sistema/temas-mui",
        method: values.id ? "PUT" : "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);

      if (response.success) {
        toast.success("Tema salvo com sucesso!");
        const tema = response.tema as Mui.Theme;
        setTema(tema);
        setTemas((list) => {
          if (!id) return [...list, tema];
          return list.map((t) => (t.id === tema.id ? tema : t));
        });
        if (tema.ativo) fetchTema();
        if (!id) navigate("/temas/editar/" + tema.id);
      }
    },
    [fileFavicon, fileLogoLogin, fileLogoHeader, fileLogoSimples]
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
    <MainLayout
      title={id ? "Editar tema" : "Criar tema"}
      mainContainerMaxWidth="lg"
      paperSx={{ p: 0 }}
      loading={loading}
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
              fileLogoSimples={fileLogoSimples}
              setFileLogoSimples={setFileLogoSimples}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    </MainLayout>
  );
};

export default SalvarTema;
