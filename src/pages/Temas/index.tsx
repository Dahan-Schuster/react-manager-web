import AddCircle from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../../containers/Auth/RequireAuth";
import MainLayout from "../../containers/Common/MainLayout";
import CardTema from "../../containers/TemasMui/CardTema";
import { useTemasMui } from "../../contexts/TemasMuiContext";
import useDebounceEffect from "../../hooks/useDebonceEffect";
import useUserPermissions from "../../hooks/useUserPermissions";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

interface TemasPageProps {}

/**
 * Página de CRUD de temas do sistema
 */
const TemasPage: FC<TemasPageProps> = () => {
  const { getTemas, temas } = useTemasMui();
  const { has } = useUserPermissions();

  useDebounceEffect(() => {
    if (temas.length === 0) getTemas();
  }, []);

  const navigate = useNavigate();

  const [temasAtivos, temasInativos] = useMemo(() => {
    const ativos: Mui.Theme[] = [],
      inativos: Mui.Theme[] = [];

    temas.forEach((tema) => {
      tema.ativo ? ativos.push(tema) : inativos.push(tema);
    });

    return [ativos, inativos];
  }, [temas]);

  return (
    <RequireAuth>
      <MainLayout
        title="Temas"
        options={[
          ...(has("temas-criar")
            ? [
                <Button
                  startIcon={<AddCircle />}
                  variant="outlined"
                  onClick={() => navigate("/temas/novo")}
                >
                  Adicionar
                </Button>,
              ]
            : []),
        ]}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography color="text.primary" variant="h6">
              Temas ativos
            </Typography>
          </Grid>
          {temasAtivos.map((t) => (
            <Grid item xs={12} sm={6} md={4} key={t.id}>
              <CardTema item={t} />
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography color="text.primary" variant="h6">
              Temas inativos
            </Typography>
          </Grid>
          {temasInativos.map((t) => (
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
