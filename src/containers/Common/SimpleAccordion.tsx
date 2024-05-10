import { ArrowDropDown } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { FC, ReactNode } from "react";

interface SimpleAccordionProps {
  label: string;
  secondayLabel?: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  unmountOnExit?: boolean;
}

/**
 * Componente de Accordion simples
 */
const SimpleAccordion: FC<SimpleAccordionProps> = ({
  label,
  secondayLabel,
  children,
  defaultExpanded,
  unmountOnExit = true,
}) => {
  return (
    <Accordion
      disableGutters
      defaultExpanded={defaultExpanded}
      slotProps={{ transition: { unmountOnExit } }}
      sx={{
        "&.Mui-expanded::before": {
          content: "''",
          opacity: 1,
        },
        "&::before": {
          position: "absolute",
          left: 0,
          top: -1,
          right: 0,
          height: "1px",
          content: "''",
          opacity: 1,
          backgroundColor: "rgba(0, 0, 0, 0.12)",
          transition:
            "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ArrowDropDown />}
        sx={{
          "& .MuiAccordionSummary-content": {
            gap: 2,
            flexWrap: { xs: "wrap", md: "nowrap" },
          },
        }}
      >
        <Typography
          minWidth={"15%"}
          color="text.primary"
          variant="h5"
          fontSize={22}
        >
          {label}
        </Typography>
        {!!secondayLabel && (
          <Typography color="text.secondary" variant="h6" fontSize={18}>
            {secondayLabel}
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default SimpleAccordion;
