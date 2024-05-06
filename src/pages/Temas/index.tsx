import { FC, memo } from "react";
import MainLayout from "../../containers/Common/MainLayout";
import { TemasMuiProvider, useTemasMui } from "../../contexts/TemasMuiContext";
import useDebounceEffect from "../../hooks/useDebonceEffect";
import RequireAuth from "../../containers/Auth/RequireAuth";
import WithContext from "../../containers/WithContext";
import CardTema from "../../containers/TemasMui/CardTema";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddCircle from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";

interface TemasPageProps {}

/**
 * Página de CRUD de temas do sistema
 */
const TemasPage: FC<TemasPageProps> = () => {
  const { getTemas, temas } = useTemasMui();

  useDebounceEffect(() => {
    if (temas.length === 0) getTemas();
  });

  const navigate = useNavigate();

  return (
    <MainLayout title="Temas">
      <Grid container spacing={1}>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button
            startIcon={<AddCircle />}
            variant="outlined"
            onClick={() => navigate("/temas/novo")}
          >
            Adicionar
          </Button>
        </Grid>
        {temas.map((t) => (
          <Grid item xs={12} sm={6} md={4} key={t.id}>
            <CardTema item={t} />
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
};

export default memo(() => (
  <RequireAuth>
    <TemasPage />
  </RequireAuth>
));
