import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Breakpoint } from "@mui/material/styles";
import { FC, Fragment, ReactNode } from "react";

interface CustomDialogProps {
  children?: React.ReactNode;
  title: string;
  onOkClick?: VoidFunction;
  okLabel?: string;
  onCloseClick?: VoidFunction;
  closeLabel?: string;
  open: boolean;
  loading?: boolean;
  actions?: ReactNode[];
  maxWidth?: Breakpoint;
}

/**
 * CustomDialog documentation
 */
const CustomDialog: FC<CustomDialogProps> = ({
  onCloseClick,
  open,
  title,
  children,
  closeLabel,
  okLabel,
  onOkClick,
  loading,
  actions,
  maxWidth = "sm",
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby={`alert-dialog-${title}-title`}
      aria-describedby={`alert-dialog-${title}-descriprion`}
      fullWidth
      maxWidth={maxWidth}
    >
      <DialogTitle
        sx={{ backgroundColor: "background.default" }}
        id={`alert-dialog-${title}-title`}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "background.paper" }}>
        <Box p={2} id={`alert-dialog-${title}-descriprion`}>
          {children}
        </Box>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "background.default" }}>
        {typeof onCloseClick === "function" && (
          <Button onClick={onCloseClick}>{closeLabel || "Fechar"}</Button>
        )}
        {typeof onOkClick === "function" && (
          <Button
            disabled={loading}
            onClick={loading ? undefined : () => onOkClick()}
            autoFocus
          >
            {okLabel || "Ok"}
          </Button>
        )}
        {actions?.map((action, index) => (
          <Fragment key={index}>{action}</Fragment>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
