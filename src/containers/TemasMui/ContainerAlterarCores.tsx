import { ArrowDropDown } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC, memo } from "react";
import PickerCor from "./PickerCor";
import { FieldInputProps } from "formik";

interface ContainerAlterarCoresProps {
  label: string;
  cores: ({ label: string } & FieldInputProps<string>)[];
}

/**
 * Container para alterar cores do tema
 * Recebe um array com as cores a serem alteradas
 */
const ContainerAlterarCores: FC<ContainerAlterarCoresProps> = memo(
  ({ label, cores }) => {
    return (
      <Accordion
        disableGutters
        sx={{
          minHeight: "56px",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          sx={{ p: 0, display: "flex", alignItems: "center" }}
          expandIcon={<ArrowDropDown />}
        >
          <Typography sx={{ flex: 1 }}>{label}</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {cores.map(({ label, value }) => (
              <Box
                key={label}
                title={label}
                sx={{
                  display: "inline-block",
                  ml: 1,
                  width: "16px",
                  height: "16px",
                  backgroundColor: value,
                }}
              />
            ))}
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0, pr: 2 }}>
          {cores.map(({ label, value, onChange, name }) => (
            <PickerCor
              key={label}
              label={label}
              cor={value}
              onChange={(v) => {
                onChange(name)(v);
              }}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    );
  }
);

export default ContainerAlterarCores;
