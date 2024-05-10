import { FC, useMemo } from "react";
import SimpleAccordion from "../Common/SimpleAccordion";

interface AccordionPermissoesModuloUserProps {
  modulo: Sistema.ModuloType;
  user: Users.UserType;
}

/**
 * Linha da tabela de permissões do usuário por módulo
 */
const AccordionPermissoesModuloUser: FC<AccordionPermissoesModuloUserProps> = ({
  modulo,
  user,
}) => {
  const labelPermissoes = useMemo<string>(() => {
    let label = "";
    if (modulo.tiposPermissoes.length) {
      label = "(";
      modulo.tiposPermissoes.forEach((permModulo) => {
        label += permModulo.label + ", ";
      });
      label = label.slice(0, label.length - 2) + ")";
    } else {
      label = "(Módulo sem permissões)";
    }

    return label;
  }, []);

  return (
    // TODO: Adicionar checkbox de todas as permissões na linha de título do accordion
    <SimpleAccordion label={modulo.nome} secondayLabel={labelPermissoes}>
      {modulo.tiposPermissoes.map((tipoPermissao) => (
        // TODO: Checkboxes de cada permissão do módulo
        <>{tipoPermissao.label}</>
      ))}
    </SimpleAccordion>
  );
};

export default AccordionPermissoesModuloUser;
