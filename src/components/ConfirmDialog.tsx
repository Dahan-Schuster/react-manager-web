import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface AlertDialogProps {
  title?: string;
  text?: string;
  open: boolean;
  onConfirm: VoidFunction;
  onClose: VoidFunction;
  loading?: boolean;
}
const ConfirmDialog: React.FC<AlertDialogProps> = ({
  title,
  text,
  open = false,
  onConfirm,
  onClose,
  loading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {!!title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        {!!text && (
          <DialogContentText
            color="text.secondary"
            id="alert-dialog-description"
            fontWeight={"bold"}
          >
            {text}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onClose}>
          {loading ? "Fechar" : "Cancelar"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onConfirm}
          disabled={loading}
          autoFocus
        >
          {loading ? "Aguarde..." : "Confirmar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

