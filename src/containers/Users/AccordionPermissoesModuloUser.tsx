import { Dispatch, FC, SetStateAction } from "react";
import SimpleAccordion from "../Common/SimpleAccordion";
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
      actions={[
        <CheckboxTodasPermissoesModulo
          modulo={modulo}
          user={user}
          setUser={setUser}
        />,
      ]}
    >
      {modulo.tiposPermissoes.map((tipoPermissao) => (
        // TODO: Checkboxes de cada permissão do módulo
        <>{tipoPermissao.label}</>
      ))}
    </SimpleAccordion>
  );
};

export default AccordionPermissoesModuloUser;
