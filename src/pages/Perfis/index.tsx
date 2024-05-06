import { FC, useState } from "react";
import LoadingOverlay from "../../components/LoadingOverlay";
import RequireAuth from "../../containers/Auth/RequireAuth";
import MainLayout from "../../containers/Common/MainLayout";
import TableModulosPerfisPermissoes from "../../containers/Perfis/TableModulosPerfisPermissoes";
import { usePerfis } from "../../contexts/PerfisContext";
import useDebounceEffect from "../../hooks/useDebonceEffect";
import useModulos from "../../services/useModulos";

/**
 * CRUD de perfis e suas permissões por módulo
 */
const Perfis: FC = () => {
  const { perfis, getPerfis } = usePerfis();
  const { modulos, getModulos } = useModulos();

  const [loading, setLoading] = useState<boolean>(false);

  useDebounceEffect(() => {
    setLoading(true);
    Promise.all([getModulos(), getPerfis(true)]).finally(() =>
      setLoading(false)
    );
  }, []);

  return (
    <MainLayout title="Perfis">
      {loading && <LoadingOverlay open />}
      <TableModulosPerfisPermissoes modulos={modulos} perfis={perfis} />
    </MainLayout>
  );
};

export default () => (
  <RequireAuth>
    <Perfis />
  </RequireAuth>
);
