import InfoIcon from "@mui/icons-material/Info";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FC, useEffect, useRef } from "react";
import { Id, toast } from "react-toastify";
import { useLocalStorage } from "usehooks-ts";
import { storageBaseName } from "../../constants";
import RowModuloPerfisPermissoes from "./RowModuloPerfisPermissoes";
import ColunaNomePerfil from "./ColunaNomePerfil";

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
  const [openInfo, setOpenInfo] = useLocalStorage(
    storageBaseName + ":openInfoPerfis",
    true
  );

  const toastId = useRef<Id | null>(null);
  useEffect(() => {
    toastId.current = toast.warning(
      "Atenção! Alterações feitas nesta tela impactam imediatamente os usuários associados aos perfis.",
      {
        autoClose: false,
        position: "bottom-center",
      }
    );

    return () => {
      if (toastId.current) {
        toast.dismiss(toastId.current);
      }
    };
  }, []);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {openInfo && (
          <Alert severity="info" onClose={() => setOpenInfo(false)}>
            Selecione os checkboxes para definir as permissões de cada perfil em
            cada módulo do sistema. Você pode expandir o módulo para ver as
            permissões mais específicas.
          </Alert>
        )}
      </Box>
      <TableContainer>
        <Table size="small" sx={{ minWidth: 500, tableLayout: "fixed" }}>
          <TableHead>
            <TableRow sx={{ "& > *": { fontWeight: "600" } }}>
              <TableCell sx={{ width: "48px" }} />
              <TableCell sx={{ width: "200px" }} />
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
                <TableCell key={p.id} sx={{ px: 1 }} align="left">
                  <ColunaNomePerfil perfil={p} />
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
