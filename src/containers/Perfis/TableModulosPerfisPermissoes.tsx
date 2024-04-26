import { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RowModuloPerfisPermissoes from "./RowModuloPerfisPermissoes";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";

interface TableModulosPerfisPermissoesProps {
  modulos: Sistema.ModuloType[];
  perfis: Perfis.PerfilType[];
}

/**
 * Página de listagem de módulos do sistema e suas permissões,
 * com os perfis disponíveis em cada coluna da tabela
 */
const TableModulosPerfisPermissoes: FC<TableModulosPerfisPermissoesProps> = ({
  modulos,
  perfis,
}) => {
  return (
    <Box>
      <Alert
        sx={{ mb: 1 }}
        severity="info"
        icon={<InfoIcon fontSize="inherit" />}
      >
        Selecione os checkboxes para definir as permissões de cada perfil em
        cada módulo do sistema. Você pode expandir o módulo para ver as
        permissões mais específicas.
      </Alert>
      <Alert
        sx={{ mb: 2 }}
        severity="warning"
        icon={<WarningIcon fontSize="inherit" />}
      >
        Atenção! Alterações feitas nesta tela impactam imediatamente os usuários
        associados aos perfis.
      </Alert>
      <TableContainer>
        <Table size="small" sx={{ minWidth: 500, tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: "48px" }} />
            <col />
            {perfis.map((p) => (
              <col key={p.id} />
            ))}
          </colgroup>
          <TableHead>
            <TableRow sx={{ "& > *": { fontWeight: "600" } }}>
              <TableCell />
              <TableCell />
              <TableCell colSpan={perfis.length}>Perfis</TableCell>
            </TableRow>
            <TableRow sx={{ "& > *": { fontWeight: "600" } }}>
              <TableCell />
              <TableCell
                align="left"
                sx={{
                  borderRight: (theme) => `1px solid ${theme.palette.divider}`,
                }}
              >
                Módulos
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
              <RowModuloPerfisPermissoes
                key={modulo.id}
                modulo={modulo}
                perfis={perfis}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableModulosPerfisPermissoes;
