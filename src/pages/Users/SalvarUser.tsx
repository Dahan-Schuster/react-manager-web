import { FC } from "react";
import { useParams } from "react-router-dom";
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

  return (
    <MainLayout
      title={id ? "Editar Usuário" : "Cadastrar Usuário"}
      loading={loadingUsers}
    >
      <SaveUserTabs id={id} />
    </MainLayout>
  );
};

export default SalvarUser;
