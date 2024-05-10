import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Dispatch, FC, SetStateAction } from "react";
import SimpleAccordion from "../Common/SimpleAccordion";
import CheckboxPermissaoModulo from "./CheckboxPermissaoModulo";
import CheckboxTodasPermissoesModulo from "./CheckboxTodasPermissoesModulo";

interface AccordionPermissoesModuloUserProps {
  modulo: Sistema.ModuloType;
  user: Users.UserType;
  setUser: Dispatch<SetStateAction<Users.UserType>>;
}

/**
 * Linha da tabela de permissões do usuário por módulo
 */
const AccordionPermissoesModuloUser: FC<AccordionPermissoesModuloUserProps> = ({
  modulo,
  user,
  setUser,
}) => {
  return (
    <SimpleAccordion
      label={modulo.nome}
      hover
      actions={[
        <CheckboxTodasPermissoesModulo
          modulo={modulo}
          user={user}
          setUser={setUser}
        />,
      ]}
    >
      <Grid container spacing={1}>
        {modulo.tiposPermissoes.map((permModulo) => (
          <Grid item xs={12} key={permModulo.id}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.action.hover,
                },
              }}
            >
              <Typography flex={1} px={1}>
                {permModulo.label}
              </Typography>
              <CheckboxPermissaoModulo
                permissao={permModulo}
                user={user}
                setUser={setUser}
              />
              <Box sx={{ width: 24 }} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </SimpleAccordion>
  );
};

export default AccordionPermissoesModuloUser;
