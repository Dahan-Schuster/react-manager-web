import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import React, { useState } from "react";

/**
 * Campo de texto para inserção de senha
 */
const PasswordField: React.FunctionComponent<OutlinedInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = React.useCallback(() => {
    setShowPassword((show) => !show);
  }, []);
  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <OutlinedInput
        {...props}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default PasswordField;
