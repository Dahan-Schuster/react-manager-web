import InfoIcon from "@mui/icons-material/Info";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { FC } from "react";
import { useLocalStorage } from "usehooks-ts";
import { storageBaseName } from "../../constants";
import AccordionPermissoesModuloUser from "./AccordionPermissoesModuloUser";

interface FormPermissoesProps {
  user: Users.UserType;
  loadingId?: boolean;
  modulos: Sistema.ModuloType[];
}

/**
 * Form de permissões do usuário
 */
const FormPermissoes: FC<FormPermissoesProps> = ({ user, modulos }) => {
  const [openInfo, setOpenInfo] = useLocalStorage(
    storageBaseName + ":openInfoPermissoesUsuario",
    true
  );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        {openInfo && (
          <Alert severity="info" onClose={() => setOpenInfo(false)}>
            Selecione os checkboxes para definir as permissões do usuário em
            cada módulo do sistema. Você pode expandir o módulo para ver as
            permissões mais específicas.
          </Alert>
        )}
        {!openInfo && (
          <IconButton color="info" onClick={() => setOpenInfo(true)}>
            <InfoIcon />
          </IconButton>
        )}
      </Box>
      {modulos.map((modulo) => (
        <AccordionPermissoesModuloUser
          key={modulo.id}
          modulo={modulo}
          user={user}
        />
      ))}
    </Box>
  );
};

export default FormPermissoes;
