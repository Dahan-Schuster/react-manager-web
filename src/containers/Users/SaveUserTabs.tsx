import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { FC, SyntheticEvent, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import LoadingOverlay from "../../components/LoadingOverlay";
import { storageBaseName } from "../../constants";
import { useUsers } from "../../contexts/UsersContext";
import useDebounceEffect from "../../hooks/useDebonceEffect";
import useModulos from "../../services/useModulos";
import TabPanel from "../Common/TabPanel";
import FormDadosIniciais from "./FormDadosIniciais";
import FormPermissoes from "./FormPermissoes";

interface CreateUserFormTabs {
  id?: number;
  closeModal?: VoidFunction;
  onCreate?: (user: Users.UserType) => void;
}

const SaveUserTabs: FC<CreateUserFormTabs> = ({ id, closeModal, onCreate }) => {
  const { showUser } = useUsers();
  const { modulos, getModulos } = useModulos();

  const [user, setUser] = useState<Users.UserType>({
    id: 0,
    nome: "",
    email: "",
    status: 1,
    perfil_id: 0,
  });

  const [, setOpenInfo] = useLocalStorage(
    storageBaseName + ":openInfoPermissoesUsuario",
    true
  );

  const [loading, setLoading] = useState<boolean>(false);

  useDebounceEffect(
    () => {
      setLoading(true);
      Promise.all([
        (() => {
          if (!id) return { success: false } as Common.CommonResponse;
          return showUser(id);
        })(),
        getModulos(),
      ])
        .then(([resUser]) => {
          if (!resUser.success && !!closeModal) closeModal();
          resUser.user && setUser(resUser.user as Users.UserType);
        })
        .finally(() => setLoading(false));
    },
    [id],
    50
  );

  const [tabValue, setTabValue] = useState(0);
  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      {loading && <LoadingOverlay open />}
      <Box sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="tabs usuário"
        >
          <Tab sx={{ py: 0, minHeight: 48 }} label="Dados iniciais" />
          {!!user.id && (
            <Tab
              label="Permissões"
              iconPosition="end"
              sx={{ py: 0, minHeight: 48 }}
              icon={
                <IconButton
                  sx={{ p: 0 }}
                  color="info"
                  onClick={() => setOpenInfo((open) => !open)}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          )}
        </Tabs>
      </Box>

      <TabPanel group="usuarios" value={tabValue} index={0}>
        <FormDadosIniciais user={user} setUser={setUser} onCreate={onCreate} />
      </TabPanel>
      {!!user.id && (
        <TabPanel group="usuarios" value={tabValue} index={1}>
          <FormPermissoes user={user} setUser={setUser} modulos={modulos} />
        </TabPanel>
      )}
    </Box>
  );
};

export default SaveUserTabs;
