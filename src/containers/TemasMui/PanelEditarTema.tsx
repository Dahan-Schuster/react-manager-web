import { ThemeProvider } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { createTheme, darken, lighten } from "@mui/material/styles";
import { Form, Formik } from "formik";
import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { MuiDefaultPalette, MuiPaletteNames, acceptImg } from "../../constants";
import useDebounceEffect from "../../hooks/useDebonceEffect";
import UploadFileButton from "../Common/UploadFileButton";
import ContainerAlterarCores from "./ContainerAlterarCores";
import SwitchModoTema from "./SwitchModoTema";

const inputsMargin = "normal";

const commonTextFieldProps: Partial<TextFieldProps> = {
  margin: inputsMargin,
  fullWidth: true,
  autoComplete: "off",
};

interface PanelEditarTemaProps {
  tema: Mui.Theme;
  setTema: Dispatch<SetStateAction<Mui.Theme>>;
  handleSubmit: (values: Mui.Theme) => void;

  fileFavicon: File | null;
  setFileFavicon: Dispatch<SetStateAction<File | null>>;

  fileLogoHeader: File | null;
  setFileLogoHeader: Dispatch<SetStateAction<File | null>>;

  fileLogoLogin: File | null;
  setFileLogoLogin: Dispatch<SetStateAction<File | null>>;
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
  fileFavicon,
  fileLogoHeader,
  fileLogoLogin,
  setFileFavicon,
  setFileLogoHeader,
  setFileLogoLogin,
}) => {
  const initialValues = useMemo<Mui.Theme>(() => {
    return {
      ...tema,
      background_default: tema.background_default || "#f0f0f0",
      background_paper: tema.background_paper || "#ffffff",
      text_primary: tema.text_primary || "#000000",
      text_secondary: tema.text_secondary || "#333333",
      text_disabled: tema.text_disabled || "#666666",
      cor_header:
        tema.cor_header ||
        tema.cores_paleta.primary?.main ||
        MuiDefaultPalette.primary.main,
      cor_texto_header:
        tema.cor_texto_header ||
        tema.cores_paleta.primary?.contrastText ||
        MuiDefaultPalette.primary.contrastText,
      cor_menu: tema.cor_menu || tema.background_paper || "#ffffff",
      cor_texto_menu: tema.cor_texto_menu || "#000000",
    };
  }, [tema]);

  return (
    <ThemeProvider theme={panelTheme}>
      <Box
        component={Paper}
        sx={{
          p: 1,
          overflowY: "scroll",
          height: "100%",
        }}
      >
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ getFieldProps, values }) => {
            useDebounceEffect(
              () => {
                setTema(values);
              },
              [values],
              200
            );

            return (
              <Form>
                <TextField
                  label="Nome do tema"
                  {...commonTextFieldProps}
                  {...getFieldProps<string>("nome")}
                />
                <Divider />
                <SwitchModoTema {...getFieldProps<string>("mui_mode")} />
                <Divider />
                <UploadFileButton
                  label="Favicon"
                  onUpload={setFileFavicon}
                  file={fileFavicon}
                  accept="image/x-icon"
                />
                <Divider />
                <UploadFileButton
                  label="Logo padrão"
                  onUpload={setFileLogoHeader}
                  file={fileLogoHeader}
                  accept={acceptImg}
                />
                <Divider />
                <UploadFileButton
                  label="Logo login"
                  onUpload={setFileLogoLogin}
                  file={fileLogoLogin}
                  accept={acceptImg}
                />
                <Divider />
                <ContainerAlterarCores
                  label="Background"
                  cores={[
                    {
                      label: "Fundo",
                      ...getFieldProps<string>("background_default"),
                    },
                    {
                      label: "Conteúdo",
                      ...getFieldProps<string>("background_paper"),
                    },
                  ]}
                />
                <Divider />
                <ContainerAlterarCores
                  label="Texto"
                  cores={[
                    {
                      label: "Primário",
                      ...getFieldProps<string>("text_primary"),
                      defaultValue: "#000000",
                    },
                    {
                      label: "Secundário",
                      ...getFieldProps<string>("text_secondary"),
                      defaultValue: "#333333",
                    },
                    {
                      label: "Inativo",
                      ...getFieldProps<string>("text_disabled"),
                      defaultValue: "#666666",
                    },
                  ]}
                />
                <Divider />
                <ContainerAlterarCores
                  label="Layout"
                  cores={[
                    {
                      label: "Cabeçalho",
                      ...getFieldProps<string>("cor_header"),
                    },
                    {
                      label: "Texto Cabeçalho",
                      ...getFieldProps<string>("cor_texto_header"),
                    },
                    {
                      label: "Menu",
                      ...getFieldProps<string>("cor_menu"),
                    },
                    {
                      label: "Texto Menu",
                      ...getFieldProps<string>("cor_texto_menu"),
                    },
                  ]}
                />
                <Divider />
                {Object.entries(MuiDefaultPalette).map((entry) => {
                  const [nome, paletaPadrao] = entry as [
                    Mui.PaletteOptions,
                    Mui.Palette
                  ];

                  const main =
                    tema.cores_paleta?.[nome]?.main || paletaPadrao.main;
                  const light =
                    tema.cores_paleta?.[nome]?.light || lighten(main, 0.2);
                  const dark =
                    tema.cores_paleta?.[nome]?.dark || darken(main, 0.2);
                  const contrastText =
                    tema.cores_paleta?.[nome]?.contrastText ||
                    paletaPadrao.contrastText;

                  return (
                    <ContainerAlterarCores
                      key={nome}
                      label={MuiPaletteNames[nome]}
                      cores={[
                        {
                          label: "Padrão",
                          ...getFieldProps(`cores_paleta.${nome}.main`),
                          defaultValue: paletaPadrao.main,
                        },
                        {
                          label: "Claro",
                          ...getFieldProps(`cores_paleta.${nome}.light`),
                          value: light,
                          defaultValue: light,
                        },
                        {
                          label: "Escuro",
                          ...getFieldProps(`cores_paleta.${nome}.dark`),
                          value: dark,
                          defaultValue: dark,
                        },
                        {
                          label: "Cor do texto",
                          ...getFieldProps(`cores_paleta.${nome}.contrastText`),
                          value: contrastText!,
                          defaultValue: paletaPadrao.contrastText,
                        },
                      ]}
                    />
                  );
                })}
                <Divider />

                <Box p={1}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="success"
                  >
                    Salvar
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </ThemeProvider>
  );
};

export default PanelEditarTema;
