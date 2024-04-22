import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import useDebounceEffect from "../hooks/useDebonceEffect";
import config from "../config";
import { ptBR as corePtBR } from "@mui/material/locale";
import { useLocalStorage } from "usehooks-ts";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface ThemeContextValue {
  temaAtivo: Mui.Theme | null;
  modoTema: Mui.ThemeMode;
  toggleMode: VoidFunction;
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
  const [modoTema, setModoTema] = useLocalStorage<Mui.ThemeMode>(
    config.storageKeys.modoTema,
    "light"
  );

  const toggleMode = useCallback(() => {
    setModoTema((curr) => (curr === "light" ? "dark" : "light"));
  }, []);

  useDebounceEffect(() => {
    const modo = modoTema === "dark" ? "dark" : "light";
    fetch(config.apiBaseUrl + `/sistema/temas-mui/ativo-${modo}`)
      .then((response) => response.json() as Promise<Common.CommonResponse>)
      .then((data) => {
        if (data.success) {
          const tema = data.tema as Mui.Theme;
          setTemaAtivo(tema);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [modoTema]);

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode: temaAtivo?.mui_mode,
            ...temaAtivo?.coresMui,
            background: {
              default: temaAtivo?.background_default,
              paper: temaAtivo?.background_paper,
            },
            text: {
              primary: temaAtivo?.text_primary,
              secondary: temaAtivo?.text_secondary,
              disabled: temaAtivo?.text_disabled,
            },
          },
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
                ".MuiPaper-root *": {
                  "::-webkit-scrollbar": {
                    width: 8,
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
        corePtBR
      ),
    [temaAtivo]
  );

  return (
    <MuiThemeContext.Provider
      value={{
        temaAtivo,
        modoTema,
        toggleMode,
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
