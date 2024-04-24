import Checkbox from "@mui/material/Checkbox";
import { FC, memo, useCallback, useState } from "react";
import { usePerfis } from "../../contexts/PerfisContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface CheckboxPermissoesModuloProps {
  modulo: Sistema.ModuloType;
  perfil: Perfis.PerfilType;
}

/**
 * Checkbox que indica se o perfil tem todas ou alguma permissão para o módulo
 */
const CheckboxTodasPermissoesModulo: FC<CheckboxPermissoesModuloProps> = memo(
  ({ modulo, perfil }) => {
    const possuiTodas = modulo.tiposPermissoes.every((permModulo) =>
      perfil.permissoes?.find((permPerfil) => permPerfil.id === permModulo.id)
    );

    const possuiAlguma =
      !possuiTodas &&
      modulo.tiposPermissoes.some((permModulo) =>
        perfil.permissoes?.find((permPerfil) => permPerfil.id === permModulo.id)
      );

    const idsPermissoesModulo = modulo.tiposPermissoes.map(
      (permModulo) => permModulo.id
    );

    const [loading, setLoading] = useState<boolean>(false);

    const { updatePerfis } = usePerfis();

    /** Envia requisição de alteração das permissões do perfil, passando todas as permissões ou nenhuma */
    const handleChange = useCallback(() => {
      setLoading(true);
      updatePerfis(perfil.id, {
        novasPermissoes: possuiTodas ? [] : idsPermissoesModulo,
        permissoesDeletar: possuiTodas ? idsPermissoesModulo : [],
      }).finally(() => setLoading(false));
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
      />
    );
  }
);

export default CheckboxTodasPermissoesModulo;
