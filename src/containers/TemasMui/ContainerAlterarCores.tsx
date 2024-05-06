import { ArrowDropDown } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import PickerCor from "./PickerCor";

interface ContainerAlterarCoresProps {
  label: string;
  cores: { label: string; cor: string; onChange: (v: string) => void }[];
}

/**
 * Container para alterar cores do tema
 * Recebe um array com as cores a serem alteradas
 */
const ContainerAlterarCores: FC<ContainerAlterarCoresProps> = ({
  label,
  cores,
}) => {
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
          {cores.map(({ label, cor }) => (
            <Box
              key={label}
              title={label}
              sx={{
                display: "inline-block",
                ml: 1,
                width: "16px",
                height: "16px",
                backgroundColor: cor,
              }}
            />
          ))}
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0, pr: 2 }}>
        {cores.map(({ label, cor, onChange }) => (
          <PickerCor key={label} label={label} cor={cor} onChange={onChange} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default ContainerAlterarCores;
