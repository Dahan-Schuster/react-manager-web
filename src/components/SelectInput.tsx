import { InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { MouseEvent } from "react";
import { useMuiTheme } from "../contexts/MuiThemeContext";

export interface SelectInputProps {
  label?: string;
  value?: string | number;
  size?: "medium" | "small";
  margin?: "normal" | "none" | "dense";
  onChange: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
  values?: { label: string; value: string | number }[];
  disabled?: boolean;
  optional?: boolean;
  emptyLabel?: string;
  emptyValue?: string | number;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

/**
 * Componente de seleção de itens padrão do app
 */
const SelectInput: React.FunctionComponent<SelectInputProps> = ({
  value = "",
  size = "small",
  margin = "none",
  label,
  onChange,
  values,
  disabled,
  onClick,
  optional = false,
  emptyLabel = label,
  emptyValue = 0,
}) => {
  const { muiTheme } = useMuiTheme();
  const { palette } = muiTheme;

  return (
    <FormControl size={size} margin={margin} fullWidth>
      {!!label && <InputLabel id={`select-${label}-label`}>{label}</InputLabel>}
      <Select
        labelId={label ? `select-${label}-label` : undefined}
        id={`select-${label}`}
        label={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onClick={onClick}
        sx={{
          "& .MuiSelect-select": { paddingX: 1 },
          color: palette.text.secondary,
        }}
      >
        {optional && (
          <MenuItem value={emptyValue}>{emptyLabel || "Nenhum"}</MenuItem>
        )}
        {values?.map(({ label, value }) => (
          <MenuItem
            sx={{ color: palette.text.secondary }}
            key={value}
            value={value}
          >
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
