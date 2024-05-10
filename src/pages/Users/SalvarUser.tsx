import { FC, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../containers/Common/MainLayout";
import SaveUserTabs from "../../containers/Users/SaveUserTabs";
import { useUsers } from "../../contexts/UsersContext";

interface SalvarUserProps {}

/**
 * Tela para cadastrar/editar usuários
 */
const SalvarUser: FC<SalvarUserProps> = () => {
  const { id: strId } = useParams();
  const id = strId ? parseInt(strId) : undefined;

  const { loadingUsers } = useUsers();

  const navigate = useNavigate();
  const reload = useCallback((user: Users.UserType) => {
    if (user.id) {
      navigate(`/usuarios/editar/${user.id}`);
    }
  }, []);

  return (
    <MainLayout
      title={id ? "Editar Usuário" : "Cadastrar Usuário"}
      loading={loadingUsers}
    >
      <SaveUserTabs id={id} onCreate={reload} />
    </MainLayout>
  );
};

export default SalvarUser;
