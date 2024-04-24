import { FC } from "react";
import SelectInput, { SelectInputProps } from "../../components/SelectInput";
import { usePerfis } from "../../contexts/PerfisContext";
import useDebounceEffect from "../../hooks/useDebonceEffect";
import useUserPermissions from "../../hooks/useUserPermissions";

const SelectPerfil: FC<SelectInputProps> = (props) => {
  const { has } = useUserPermissions();
  const podeListar = has("perfis-listar");
  const { perfis, getPerfis } = usePerfis();

  useDebounceEffect(() => {
    if (podeListar && !perfis.length) getPerfis();
  }, []);

  if (!podeListar) return null;
  return (
    <SelectInput
      {...props}
      values={perfis.map((p) => ({ label: p.nome, value: p.id }))}
    />
  );
};

export default SelectPerfil;
