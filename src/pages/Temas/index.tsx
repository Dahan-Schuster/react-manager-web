import { FC } from "react";
import MainLayout from "../../containers/Common/MainLayout";

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

export default TemasPage;
