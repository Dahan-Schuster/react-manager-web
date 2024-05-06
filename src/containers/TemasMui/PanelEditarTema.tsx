import { ThemeProvider } from "@emotion/react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { createTheme, darken, lighten } from "@mui/material/styles";
import { Form, Formik } from "formik";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import SwitchModoTema from "./SwitchModoTema";
import ContainerAlterarCores from "./ContainerAlterarCores";
import { MuiDefaultPalette, MuiPaletteNames } from "../../constants";
import Button from "@mui/material/Button";

const inputsMargin = "normal";

const commonTextFieldProps: Partial<TextFieldProps> = {
  margin: inputsMargin,
  fullWidth: true,
  autoComplete: "off",
};

interface PanelEditarTemaProps {
  tema: Mui.Theme;
  setTema: Dispatch<SetStateAction<Mui.Theme>>;
  handleSubmit: () => void;
}

// tema específico do painel de edição, para diferenciar do tema do sistema e do tema sendo editado
const panelTheme = createTheme({
  palette: {
    mode: "dark",
    background: { paper: "#424242" },
    primary: { main: "#f9f9f9" },
    divider: "#909090",
  },
});

/**
 * Painel de edição do tema MUI
 */
const PanelEditarTema: FC<PanelEditarTemaProps> = ({
  tema,
  setTema,
  handleSubmit,
}) => {
  const handleChangeCorPaleta = useCallback(
    (value: string, nome: Mui.PaletteOptions, variante: keyof Mui.Palette) => {
      setTema((prev) => ({
        ...prev,
        cores_paleta: {
          ...prev.cores_paleta,
          [nome]: {
            ...prev.cores_paleta[nome],
            [variante]: value,
          },
        },
      }));
    },
    []
  );

  return (
    <ThemeProvider theme={panelTheme}>
      <Box
        component={Paper}
        sx={{
          p: 1,
          overflowY: "scroll",
        }}
      >
        <Box
          component={"form"}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            label="Nome do tema"
            {...commonTextFieldProps}
            onChange={(e) =>
              setTema((prev) => ({ ...prev, nome: e.target.value }))
            }
          />
          <Divider />
          <SwitchModoTema tema={tema} setTema={setTema} />
          <Divider />
          <ContainerAlterarCores
            label="Background"
            cores={[
              {
                label: "Padrão",
                cor: tema.background_default || "#f0f0f0",
                onChange: (v) =>
                  setTema((prev) => ({ ...prev, background_default: v })),
              },
              {
                label: "Claro",
                cor: tema.background_paper || "#ffffff",
                onChange: (v) =>
                  setTema((prev) => ({ ...prev, background_paper: v })),
              },
            ]}
          />
          <Divider />
          <ContainerAlterarCores
            label="Texto"
            cores={[
              {
                label: "Primário",
                cor: tema.text_primary || "#000000",
                onChange: (v) =>
                  setTema((prev) => ({ ...prev, text_primary: v })),
              },
              {
                label: "Secundário",
                cor: tema.text_secondary || "#333333",
                onChange: (v) =>
                  setTema((prev) => ({ ...prev, text_secondary: v })),
              },
              {
                label: "Inativo",
                cor: tema.text_disabled || "#666666",
                onChange: (v) =>
                  setTema((prev) => ({ ...prev, text_disabled: v })),
              },
            ]}
          />
          <Divider />
          {Object.entries(MuiDefaultPalette).map(([nome, paletaPadrao]) => {
            let _nome: Mui.PaletteOptions = nome as Mui.PaletteOptions;

            const coresPaleta = tema.cores_paleta?.[_nome] || paletaPadrao;

            return (
              <ContainerAlterarCores
                key={_nome}
                label={MuiPaletteNames[_nome]}
                cores={[
                  {
                    label: "Padrão",
                    cor: coresPaleta.main,
                    onChange: (v) => handleChangeCorPaleta(v, _nome, "main"),
                  },
                  {
                    label: "Claro",
                    cor: coresPaleta.light || lighten(coresPaleta.main, 0.2),
                    onChange: (v) => handleChangeCorPaleta(v, _nome, "light"),
                  },
                  {
                    label: "Escuro",
                    cor: coresPaleta.dark || darken(coresPaleta.main, 0.2),
                    onChange: (v) => handleChangeCorPaleta(v, _nome, "dark"),
                  },
                  {
                    label: "Cor do texto",
                    cor: coresPaleta.contrastText || "#000",
                    onChange: (v) =>
                      handleChangeCorPaleta(v, _nome, "contrastText"),
                  },
                ]}
              />
            );
          })}
          <Divider />

          <Box p={1}>
            <Button fullWidth type="submit" variant="contained" color="success">
              Salvar
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PanelEditarTema;
