import { FC } from "react";
import MainLayout from "../containers/Common/MainLayout";

interface InitialPageProps {}

/**
 * Página inicial da aplicação
 */
const InitialPage: FC<InitialPageProps> = () => {
  return <MainLayout title="Home">Página inicial</MainLayout>;
};

export default InitialPage;
