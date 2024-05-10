import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";
import { inputsMargin, storageBaseName } from "../../constants";
import { useUsers } from "../../contexts/UsersContext";
import useUserPermissions from "../../hooks/useUserPermissions";
import SelectPerfil from "../Perfis/SelectPerfil";
import AccordionPermissoesModuloUser from "./AccordionPermissoesModuloUser";

interface FormPermissoesProps {
  user: Users.UserType;
  setUser: Dispatch<SetStateAction<Users.UserType>>;
  loadingId?: boolean;
  modulos: Sistema.ModuloType[];
}

/**
 * Form de permissões do usuário
 */
const FormPermissoes: FC<FormPermissoesProps> = ({
  user,
  setUser,
  modulos,
}) => {
  const [openInfo, setOpenInfo] = useLocalStorage(
    storageBaseName + ":openInfoPermissoesUsuario",
    true
  );
  const { has } = useUserPermissions();
  const { changePerfilUser } = useUsers();

  const handleSubmitPerfil = useCallback(
    (perfilId: number) => {
      if (!user.id) return;
      changePerfilUser(user.id, perfilId).then(
        (res) => res.success && setUser(res.user)
      );
    },
    [user.id]
  );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {openInfo && (
          <Alert severity="info" onClose={() => setOpenInfo(false)}>
            Selecione os checkboxes para fixar ou remover as permissões do
            usuário em cada módulo do sistema, sobrepondo as permissões do
            perfil. Você pode expandir o módulo para ver as permissões mais
            específicas.
            <p>
              Checkboxes com a{" "}
              <Typography
                component="span"
                color="warning.main"
                fontWeight="bold"
              >
                cor de aviso
              </Typography>{" "}
              indicam que a permissão sobrepõe as permissões do perfil.
            </p>
            <p>
              Checkboxes com a{" "}
              <Typography
                component="span"
                color="primary.main"
                fontWeight="bold"
              >
                cor primária
              </Typography>{" "}
              indicam que a permissão foi herdada pelo perfil.
            </p>
          </Alert>
        )}
      </Box>
      {has("usuarios-alterar-permissao") && (
        <SelectPerfil
          label="Perfil do usuário"
          size="medium"
          margin={inputsMargin}
          optional
          emptyValue={0}
          emptyLabel="Sem perfil"
          value={user.perfil_id || 0}
          onChange={(e) => {
            const value = e.target.value;
            if (user.id) {
              handleSubmitPerfil(value as number);
            }
          }}
        />
      )}
      {modulos.map((modulo) => (
        <AccordionPermissoesModuloUser
          key={modulo.id}
          modulo={modulo}
          user={user}
          setUser={setUser}
        />
      ))}
    </Box>
  );
};

export default FormPermissoes;
