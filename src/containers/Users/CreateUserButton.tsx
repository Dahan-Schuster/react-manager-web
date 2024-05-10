import { AddCircle as AddCircleIcon } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import useUserPermissions from "../../hooks/useUserPermissions";

interface CreateUserButtonProps {}

/**
 * Container para a lógica de criar um usuário com um modal aberto por um botão
 */
const CreateUserButton: React.FunctionComponent<CreateUserButtonProps> = () => {
  const { has } = useUserPermissions();
  const podeCriar = has("usuarios-criar");
  const navigate = useNavigate();

  if (!podeCriar) return null;
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        onClick={() => navigate("/usuarios/novo")}
        variant="outlined"
        startIcon={<AddCircleIcon />}
      >
        Adicionar
      </Button>
    </Box>
  );
};

export default CreateUserButton;
