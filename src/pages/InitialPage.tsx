import { FC } from "react";
import MainLayout from "../containers/Common/MainLayout";
import RequireAuth from "../containers/Auth/RequireAuth";

interface InitialPageProps {}

/**
 * Página inicial da aplicação
 */
const InitialPage: FC<InitialPageProps> = () => {
  return (
    <RequireAuth>
      <MainLayout title="Home">Página inicial</MainLayout>
    </RequireAuth>
  );
};

export default InitialPage;
