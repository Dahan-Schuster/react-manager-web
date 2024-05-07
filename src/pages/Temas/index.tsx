import AddCircle from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../../containers/Auth/RequireAuth";
import MainLayout from "../../containers/Common/MainLayout";
import CardTema from "../../containers/TemasMui/CardTema";
import { useTemasMui } from "../../contexts/TemasMuiContext";
import useDebounceEffect from "../../hooks/useDebonceEffect";

interface TemasPageProps {}

/**
 * Página de CRUD de temas do sistema
 */
const TemasPage: FC<TemasPageProps> = () => {
  const { getTemas, temas } = useTemasMui();

  useDebounceEffect(() => {
    if (temas.length === 0) getTemas();
  }, []);

  const navigate = useNavigate();

  return (
    <RequireAuth>
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
    </RequireAuth>
  );
};

export default TemasPage;
