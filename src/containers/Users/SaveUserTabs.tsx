import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { FC, SyntheticEvent, useState } from "react";
import { useUsers } from "../../contexts/UsersContext";
import useDebounceEffect from "../../hooks/useDebonceEffect";
import TabPanel from "../Common/TabPanel";
import FormDadosIniciais from "./FormDadosIniciais";

interface CreateUserFormTabs {
  id?: number;
  closeModal?: VoidFunction;
}

const SaveUserTabs: FC<CreateUserFormTabs> = ({ id, closeModal }) => {
  const { showUser } = useUsers();
  const [user, setUser] = useState<Users.UserType>({
    id: 0,
    nome: "",
    email: "",
    status: 1,
    perfil_id: 0,
  });

  const [loadingId, setLoadingId] = useState<boolean>(false);
  useDebounceEffect(
    () => {
      if (!id) return;
      setLoadingId(true);
      showUser(id)
        .then((res) => {
          if (!res.success && !!closeModal) closeModal();
          setUser(res.user);
        })
        .finally(() => setLoadingId(false));
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
      <Box sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="tabs usuário"
        >
          <Tab label="Dados iniciais" />
        </Tabs>
      </Box>

      <TabPanel group="usuarios" value={tabValue} index={0}>
        <FormDadosIniciais user={user} loadingId={loadingId} />
      </TabPanel>
    </Box>
  );
};

export default SaveUserTabs;
