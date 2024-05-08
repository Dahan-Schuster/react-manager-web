import { FC, useEffect, useRef } from "react";
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
import { useLocalStorage } from "usehooks-ts";
import { storageBaseName } from "../../constants";
import IconButton from "@mui/material/IconButton";
import { Id, toast } from "react-toastify";

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
              <TableCell colSpan={perfis.length - 1}>Perfis</TableCell>
              <TableCell align="right">
                {!openInfo && (
                  <IconButton color="info" onClick={() => setOpenInfo(true)}>
                    <InfoIcon />
                  </IconButton>
                )}
              </TableCell>
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
