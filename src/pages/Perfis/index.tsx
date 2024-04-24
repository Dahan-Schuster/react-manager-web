import { FC, useState } from "react";
import MainLayout from "../../containers/Common/MainLayout";
import { usePerfis } from "../../contexts/PerfisContext";
import useDebounceEffect from "../../hooks/useDebonceEffect";
import useModulos from "../../services/useModulos";
import LoadingOverlay from "../../components/LoadingOverlay";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import CheckboxTodasPermissoesModulo from "../../containers/Perfis/CheckboxTodasPermissoesModulo";

/**
 * Página de listagem de módulos do sistema e suas permissões,
 * com os perfis disponíveis em cada coluna da tabela
 */
const Perfis: FC = () => {
  const { perfis, getPerfis } = usePerfis();
  const { modulos, getModulos } = useModulos();

  const [loading, setLoading] = useState<boolean>(false);

  useDebounceEffect(() => {
    setLoading(true);
    Promise.all([getModulos(), getPerfis(true)]).finally(() =>
      setLoading(false)
    );
  }, []);

  return (
    <MainLayout title="Perfis">
      {loading && <LoadingOverlay open />}
      <Table sx={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                width: "200px",
                borderRight: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              Módulo
            </TableCell>
            {perfis.map((p) => (
              <TableCell key={p.id} align="left">
                {p.nome}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {modulos.map((modulo) => (
            <TableRow key={modulo.id}>
              <TableCell
                sx={{
                  borderRight: (theme) => `1px solid ${theme.palette.divider}`,
                }}
              >
                {modulo.nome}
              </TableCell>
              {perfis.map((perfil) => {
                return (
                  <TableCell key={perfil.id} align="left">
                    <CheckboxTodasPermissoesModulo
                      modulo={modulo}
                      perfil={perfil}
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MainLayout>
  );
};

export default Perfis;
