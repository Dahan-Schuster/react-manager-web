import { FC } from "react";
import MainLayout from "../../containers/Common/MainLayout";
import { TemasMuiProvider, useTemasMui } from "../../contexts/TemasMuiContext";
import useDebounceEffect from "../../hooks/useDebonceEffect";
import RequireAuth from "../../containers/Auth/RequireAuth";
import WithContext from "../../containers/WithContext";
import CardTema from "../../containers/TemasMui/CardTema";
import Grid from "@mui/material/Grid";

interface TemasPageProps {}

/**
 * Página de CRUD de temas do sistema
 */
const TemasPage: FC<TemasPageProps> = () => {
  const { getTemas, temas } = useTemasMui();

  useDebounceEffect(() => {
    if (temas.length === 0) getTemas();
  });

  return (
    <MainLayout title="Temas">
      <Grid container spacing={1}>
        {temas.map((t) => (
          <Grid item xs={12} sm={6} md={4} key={t.id}>
            <CardTema item={t} />
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
};

export default () => (
  <RequireAuth>
    <WithContext provider={TemasMuiProvider}>
      <TemasPage />
    </WithContext>
  </RequireAuth>
);
