import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { FC, SyntheticEvent, useState } from "react";
import { useUsers } from "../../contexts/UsersContext";
import useDebounceEffect from "../../hooks/useDebonceEffect";
import TabPanel from "../Common/TabPanel";
import FormDadosIniciais from "./FormDadosIniciais";
import FormPermissoes from "./FormPermissoes";
import useModulos from "../../services/useModulos";
import LoadingOverlay from "../../components/LoadingOverlay";

interface CreateUserFormTabs {
  id?: number;
  closeModal?: VoidFunction;
}

const SaveUserTabs: FC<CreateUserFormTabs> = ({ id, closeModal }) => {
  const { showUser } = useUsers();
  const { modulos, getModulos } = useModulos();

  const [user, setUser] = useState<Users.UserType>({
    id: 0,
    nome: "",
    email: "",
    status: 1,
    perfil_id: 0,
  });

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
          <Tab label="Dados iniciais" />
          <Tab label="Permissões" />
        </Tabs>
      </Box>

      <TabPanel group="usuarios" value={tabValue} index={0}>
        <FormDadosIniciais user={user} />
      </TabPanel>
      <TabPanel group="usuarios" value={tabValue} index={1}>
        <FormPermissoes user={user} modulos={modulos} />
      </TabPanel>
    </Box>
  );
};

export default SaveUserTabs;
