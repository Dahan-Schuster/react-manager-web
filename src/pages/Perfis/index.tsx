import { AddCircle } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { FC, useState } from "react";
import MainLayout from "../../containers/Common/MainLayout";
import FormPerfil from "../../containers/Perfis/FormPerfil";
import TableModulosPerfisPermissoes from "../../containers/Perfis/TableModulosPerfisPermissoes";
import { usePerfis } from "../../contexts/PerfisContext";
import useDebounceEffect from "../../hooks/useDebonceEffect";
import useUserPermissions from "../../hooks/useUserPermissions";
import useModulos from "../../services/useModulos";

/**
 * CRUD de perfis e suas permissões por módulo
 */
const Perfis: FC = () => {
  const { perfis, getPerfis } = usePerfis();
  const { modulos, getModulos } = useModulos();
  const { has } = useUserPermissions();

  const [openFormPerfil, setOpenFormPerfil] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  useDebounceEffect(() => {
    setLoading(true);
    Promise.all([getModulos(), getPerfis(true)]).finally(() =>
      setLoading(false)
    );
  }, []);

  return (
    <MainLayout
      title="Perfis"
      loading={loading}
      options={
        has("perfis-criar")
          ? [
              <Button
                startIcon={<AddCircle />}
                variant="outlined"
                onClick={() => setOpenFormPerfil(true)}
              >
                Adicionar perfil
              </Button>,
            ]
          : []
      }
    >
      <TableModulosPerfisPermissoes modulos={modulos} perfis={perfis} />

      <FormPerfil open={openFormPerfil} setOpen={setOpenFormPerfil} />
    </MainLayout>
  );
};

export default Perfis;
