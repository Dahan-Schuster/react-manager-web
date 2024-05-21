import { AddCircle } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { FC, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { storageBaseName } from "../../constants";
import MainLayout from "../../containers/Common/MainLayout";
import FormPerfil from "../../containers/Perfis/FormPerfil";
import TableModulosPerfisPermissoes from "../../containers/Perfis/TableModulosPerfisPermissoes";
import { usePerfis } from "../../contexts/PerfisContext";
import useDebounceEffect from "../../hooks/useDebonceEffect";
import useUserPermissions from "../../hooks/useUserPermissions";
import useModulos from "../../services/useModulos";
import Tooltip from "@mui/material/Tooltip";

/**
 * CRUD de perfis e suas permissões por módulo
 */
const Perfis: FC = () => {
  const { perfis, getPerfis } = usePerfis();
  const { modulos, getModulos } = useModulos();
  const { has } = useUserPermissions();

  const [openFormPerfil, setOpenFormPerfil] = useState<boolean>(false);

  const [, setOpenInfo] = useLocalStorage(
    storageBaseName + ":openInfoPerfis",
    true
  );

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
      options={[
        has("perfis-criar") ? (
          <Button
            startIcon={<AddCircle />}
            variant="contained"
            onClick={() => setOpenFormPerfil(true)}
          >
            Adicionar perfil
          </Button>
        ) : undefined,

        <Tooltip title="Ajuda">
          <IconButton color="info" onClick={() => setOpenInfo(true)}>
            <InfoIcon />
          </IconButton>
        </Tooltip>,
      ]}
    >
      <TableModulosPerfisPermissoes modulos={modulos} perfis={perfis} />

      <FormPerfil open={openFormPerfil} setOpen={setOpenFormPerfil} />
    </MainLayout>
  );
};

export default Perfis;
