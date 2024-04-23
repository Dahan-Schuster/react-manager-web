import { AddCircle as AddCircleIcon } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import CreateUserForm from "./CreateUserForm";

interface CreateUserButtonProps {}

/**
 * Container para a lógica de criar um usuário com um modal aberto por um botão
 */
const CreateUserButton: React.FunctionComponent<CreateUserButtonProps> = () => {
  const [open, setOpen] = React.useState(false);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        onClick={() => setOpen(true)}
        variant="outlined"
        startIcon={<AddCircleIcon />}
      >
        Adicionar
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar usuário</DialogTitle>
        <DialogContent>
          <CreateUserForm closeModal={handleClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CreateUserButton;

