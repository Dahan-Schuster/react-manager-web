import { ptBR as corePtBR } from "@mui/material/locale";
import { ptBR as dataGridPtBR } from "@mui/x-data-grid/locales";
import { Theme, ThemeProvider, createTheme } from "@mui/material/styles";
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useLocalStorage } from "usehooks-ts";
import config from "../config";
import useDebounceEffect from "../hooks/useDebonceEffect";

interface ThemeContextValue {
  muiTheme: Theme;
  temaAtivo: Mui.Theme | null;
  toggleMode: VoidFunction;

  getUrlLogo: (tipo: "login" | "header" | "simples") => string | null;
  getUrlFavicon: () => string;
}

const MuiThemeContext = createContext<ThemeContextValue | null>(null);
export default MuiThemeContext;

/**
 * Contexto para buscar na API e configurar o tema MUI
 */
export const MuiThemeProvider: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [temaAtivo, setTemaAtivo] = useLocalStorage<Mui.Theme | null>(
    config.storageKeys.temaAtivo,
    null
  );

  const getUrlLogo = useCallback(
    (tipo: "login" | "header" | "simples") => {
      if (temaAtivo) {
        let url = "";
        switch (tipo) {
          case "login":
            url = temaAtivo.url_logo_login || temaAtivo.url_logo_header || "";
            break;
          case "header":
            url = temaAtivo.url_logo_header || "";
            break;
          case "simples":
            url = temaAtivo.url_logo_simples || temaAtivo.url_logo_header || "";
            break;
        }
        if (!url) return null;
        return config.apiBaseUrl + url;
      } else {
        return null;
      }
    },
    [temaAtivo]
  );

  const getUrlFavicon = useCallback(() => {
    return temaAtivo?.url_favicon
      ? config.apiBaseUrl + temaAtivo.url_favicon
      : "/favicon_default.svg";
  }, [temaAtivo]);

  const toggleMode = useCallback(() => {
    const modo = temaAtivo?.mui_mode === "dark" ? "light" : "dark";
    fetchTema(modo);
  }, [temaAtivo]);

  useDebounceEffect(() => {
    fetchTema();
  }, []);

  const fetchTema = useCallback(
    (modo?: Mui.ThemeMode) => {
      fetch(
        config.apiBaseUrl +
          `/sistema/temas-mui/ativo-${modo || temaAtivo?.mui_mode || "light"}`
      )
        .then((response) => response.json() as Promise<Common.CommonResponse>)
        .then((data) => {
          if (data.success) {
            const tema = data.tema as Mui.Theme;
            setTemaAtivo(tema);
          }
        })
        .catch(() => {});
    },
    [temaAtivo]
  );

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: temaAtivo
            ? {
                mode: temaAtivo.mui_mode,
                ...temaAtivo.cores_paleta,
                background: {
                  default: temaAtivo.background_default,
                  paper: temaAtivo.background_paper,
                },
                text: {
                  primary: temaAtivo.text_primary || "#000000",
                  secondary: temaAtivo.text_secondary,
                  disabled: temaAtivo.text_disabled,
                },
              }
            : undefined,
          components: {
            MuiCssBaseline: {
              styleOverrides: (_theme) => ({
                "*": {
                  margin: 0,
                  padding: 0,
                },
                "#root": {
                  minHeight: "100vh",
                  display: "flex",
                },
                "table, td, th": {
                  borderCollapse: "collapse",
                },
                "a:link": {
                  color: temaAtivo?.text_primary || "blue",
                },
                "a:visited": {
                  color: temaAtivo?.text_secondary || "#551abb",
                },
                ".MuiPaper-root *": {
                  "::-webkit-scrollbar": {
                    width: "6px",
                    height: "6px",
                    marginLeft: 2,
                  },
                  "::-webkit-scrollbar-thumb": {
                    background: "#d0d0db91",
                    borderRadius: 4,
                    transition: "all .5s ease",
                    "&:hover": {
                      background: "#a0a0ab91",
                    },
                  },
                },
                ".MuiDataGrid-root": {
                  styleOverrides: {
                    root: {
                      ".MuiDataGrid-overlay": {
                        height: "auto !important",
                      },
                    },
                  },
                },
              }),
            },
            MuiOutlinedInput: {
              styleOverrides: {
                root: ({ theme }) => ({
                  background: theme.palette.background.default,
                  border: 0,
                  outline: 0,
                  borderRadius: 8,
                }),
              },
            },
          },
        },
        corePtBR,
        dataGridPtBR
      ),
    [temaAtivo]
  );

  /** Atualiza o favicon usando o tema ativo */
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "shortcut icon";
      link.type = "image/x-icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = getUrlFavicon();
  }, []);

  return (
    <MuiThemeContext.Provider
      value={{
        muiTheme: theme,
        temaAtivo,
        toggleMode,

        getUrlLogo,
        getUrlFavicon,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MuiThemeContext.Provider>
  );
};

export const useMuiTheme = () => {
  const context = useContext(MuiThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }

  return context;
};
