import { ArrowDropDown } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC, Fragment, ReactNode } from "react";

interface SimpleAccordionProps {
  label: string;
  hover?: boolean;
  secondaryLabel?: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  unmountOnExit?: boolean;
  actions?: ReactNode[];
}

/**
 * Componente de Accordion simples
 */
const SimpleAccordion: FC<SimpleAccordionProps> = ({
  label,
  hover,
  secondaryLabel,
  children,
  defaultExpanded,
  unmountOnExit = true,
  actions = [],
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
          "&:hover": hover
            ? {
                backgroundColor: (theme) => theme.palette.action.hover,
              }
            : {},
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
        {!!secondaryLabel && (
          <Typography color="text.secondary" variant="h6" fontSize={18}>
            {secondaryLabel}
          </Typography>
        )}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 1,
          }}
        >
          {actions?.map((action, index) => (
            <Fragment key={index}>{action}</Fragment>
          ))}
        </Box>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default SimpleAccordion;
