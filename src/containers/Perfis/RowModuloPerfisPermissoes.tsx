import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FC, Fragment, useState } from "react";
import StyledIconButton from "../../components/StyledIconButton";
import CheckboxPermissaoModulo from "./CheckboxPermissaoModulo";
import CheckboxTodasPermissoesModulo from "./CheckboxTodasPermissoesModulo";

interface RowModuloPerfisPermissoesProps {
  modulo: Sistema.ModuloType;
  perfis: Perfis.PerfilType[];
}

/**
 * Renderiza uma linha da tabela de módulos x perfis x permissoes
 */
const RowModuloPerfisPermissoes: FC<RowModuloPerfisPermissoesProps> = ({
  modulo,
  perfis,
}) => {
  const [openContainer, setOpenContainer] = useState<boolean>(false);

  return (
    <Fragment>
      <TableRow sx={{ borderBottom: "unset" }}>
        <TableCell>
          <StyledIconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenContainer((open) => !open)}
          >
            {openContainer ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </StyledIconButton>
        </TableCell>
        <TableCell
          component="th"
          sx={{
            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
            paddingRight: 0,
          }}
        >
          {modulo.nome}
        </TableCell>
        {perfis.map((perfil) => {
          return (
            <TableCell key={perfil.id} align="left">
              <CheckboxTodasPermissoesModulo modulo={modulo} perfil={perfil} />
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={perfis.length + 2}>
          <Collapse in={openContainer} timeout="auto" unmountOnExit>
            <Table
              size="small"
              aria-label="permissões"
              sx={{ tableLayout: "fixed" }}
            >
              <TableBody>
                {modulo.tiposPermissoes.map((tipoPerm) => (
                  <TableRow key={tipoPerm.id}>
                    <TableCell sx={{ borderBottom: "unset", width: "48px" }} />
                    <TableCell
                      component="th"
                      align="right"
                      sx={{
                        borderBottom: "unset",
                        borderRight: (theme) =>
                          `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      {tipoPerm.label}
                    </TableCell>
                    {perfis.map((perfil) => (
                      <TableCell
                        key={perfil.id}
                        align="left"
                        sx={{
                          borderBottom: "unset",
                        }}
                      >
                        <CheckboxPermissaoModulo
                          permissao={tipoPerm}
                          perfil={perfil}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default RowModuloPerfisPermissoes;
