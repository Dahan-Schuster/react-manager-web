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

interface CheckboxPermissoesModuloProps {
  modulo: Sistema.ModuloType;
  user: Users.UserType;
  setUser: Dispatch<SetStateAction<Users.UserType>>;
}

/**
 * Checkbox que indica se o user tem todas ou alguma permissão para o módulo
 */
const CheckboxTodasPermissoesModulo: FC<CheckboxPermissoesModuloProps> = memo(
  ({ modulo, user, setUser }) => {
    const possuiTodas = modulo.tiposPermissoes.every((permModulo) =>
      user.permissoes?.find((permPerfil) => permPerfil.id === permModulo.id)
    );

    const possuiAlguma =
      !possuiTodas &&
      modulo.tiposPermissoes.some((permModulo) =>
        user.permissoes?.find((permPerfil) => permPerfil.id === permModulo.id)
      );

    const idsPermissoesModulo = modulo.tiposPermissoes.map(
      (permModulo) => permModulo.id
    );

    const [loading, setLoading] = useState<boolean>(false);

    const { updatePermissoes } = useUsers();

    /** Envia requisição de alteração das permissões do user, passando todas as permissões ou nenhuma */
    const handleChange = useCallback(() => {
      setLoading(true);
      updatePermissoes(user.id, {
        novasPermissoes: possuiTodas ? [] : idsPermissoesModulo,
        permissoesDeletar: possuiTodas ? idsPermissoesModulo : [],
      })
        .then((res) => res.success && setUser(res.user))
        .finally(() => setLoading(false));
    }, [possuiTodas, possuiAlguma]);

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
        checked={possuiTodas}
        indeterminate={possuiAlguma}
        onChange={handleChange}
        onClick={(event) => event.stopPropagation()}
      />
    );
  }
);

export default CheckboxTodasPermissoesModulo;
