import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { FC } from "react";

import type { FieldInputProps } from "formik";

interface SwitchModoTemaProps {}

const SwitchModoTema: FC<SwitchModoTemaProps & FieldInputProps<string>> = ({
  ...props
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "56px",
      }}
    >
      <Typography sx={{ flex: 1 }}>Modo do tema</Typography>
      <Typography sx={{ color: props.value === "light" ? "#fff" : "#ddd" }}>
        Claro
      </Typography>
      <Switch
        {...props}
        onChange={() => {
          props.onChange("mui_mode")(
            props.value === "light" ? "dark" : "light"
          );
        }}
        checked={props.value === "dark"}
      />
      <Typography sx={{ color: props.value === "dark" ? "#fff" : "#ddd" }}>
        Escuro
      </Typography>
    </Box>
  );
};

export default SwitchModoTema;
