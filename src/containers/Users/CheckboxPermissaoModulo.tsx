import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Dispatch,
  FC,
  SetStateAction,
  memo,
  useCallback,
  useState,
} from "react";
import { useUsers } from "../../contexts/UsersContext";

interface CheckboxPermissaoModuloProps {
  permissao: Sistema.PermissaoType;
  user: Users.UserType;
  setUser: Dispatch<SetStateAction<Users.UserType>>;
}

/**
 * Checkbox que indica se o user tem todas ou alguma permissão para o módulo
 */
const CheckboxPermissaoModulo: FC<CheckboxPermissaoModuloProps> = memo(
  ({ permissao, user, setUser }) => {
    const possuiPermissao: Sistema.PermissaoType | undefined =
      user.permissoes?.find((permPerfil) => permPerfil.id === permissao.id);

    const [loading, setLoading] = useState<boolean>(false);

    const { updatePermissoes } = useUsers();

    /** Envia requisição de alteração das permissões do user, adicionando ou removendo a permissão atual */
    const handleChange = useCallback(() => {
      setLoading(true);
      updatePermissoes(user.id, {
        novasPermissoes: !!possuiPermissao ? [] : [permissao.id],
        permissoesDeletar: !!possuiPermissao ? [permissao.id] : [],
      })
        .then((res) => res.success && setUser(res.user))
        .finally(() => setLoading(false));
    }, [possuiPermissao]);

    if (loading)
      return (
        <Box
          sx={{
            display: "flex",
            p: "13px",
            alignItems: "center",
          }}
        >
          <CircularProgress size="1rem" />
        </Box>
      );
    return (
      <Checkbox
        checked={!!possuiPermissao}
        onChange={handleChange}
        onClick={(event) => event.stopPropagation()}
        color={possuiPermissao?.fixada ? "warning" : "primary"}
      />
    );
  }
);

export default CheckboxPermissaoModulo;
