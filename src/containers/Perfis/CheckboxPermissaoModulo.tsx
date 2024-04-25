import Checkbox from "@mui/material/Checkbox";
import { FC, memo, useCallback, useState } from "react";
import { usePerfis } from "../../contexts/PerfisContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface CheckboxPermissaoModuloProps {
  permissao: Sistema.PermissaoType;
  perfil: Perfis.PerfilType;
}

/**
 * Checkbox que indica se o perfil tem a permissão para o módulo
 */
const CheckboxPermissaoModulo: FC<CheckboxPermissaoModuloProps> = memo(
  ({ permissao, perfil }) => {
    const possuiPermissao = Boolean(
      perfil.permissoes?.find((permPerfil) => permPerfil.id === permissao.id)
    );

    const [loading, setLoading] = useState<boolean>(false);

    const { updatePerfis } = usePerfis();

    /** Envia requisição de alteração das permissões do perfil, adicionando ou removendo a permissão atual */
    const handleChange = useCallback(() => {
      setLoading(true);
      updatePerfis(perfil.id, {
        novasPermissoes: possuiPermissao ? [] : [permissao.id],
        permissoesDeletar: possuiPermissao ? [permissao.id] : [],
      }).finally(() => setLoading(false));
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
    return <Checkbox checked={possuiPermissao} onChange={handleChange} />;
  }
);

export default CheckboxPermissaoModulo;
