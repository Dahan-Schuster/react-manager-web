import { FC } from "react";
import MainLayout from "../../containers/Common/MainLayout";
import RequireAuth from "../../containers/Auth/RequireAuth";

interface TemasPageProps {}

/**
 * Página de CRUD de temas do sistema
 */
const TemasPage: FC<TemasPageProps> = () => {
  return (
    <MainLayout title="Temas">
      <h1>Temas</h1>
    </MainLayout>
  );
};

export default () => (
  <RequireAuth>
    <TemasPage />
  </RequireAuth>
);
