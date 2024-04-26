import { FC } from "react";
import SelectInput, { SelectInputProps } from "../../components/SelectInput";
import { usePerfis } from "../../contexts/PerfisContext";
import useDebounceEffect from "../../hooks/useDebonceEffect";

const SelectPerfil: FC<SelectInputProps> = (props) => {
  const { perfis, getPerfis } = usePerfis();

  useDebounceEffect(() => {
    if (!perfis.length) getPerfis();
  }, []);

  return (
    <SelectInput
      {...props}
      values={perfis.map((p) => ({ label: p.nome, value: p.id }))}
    />
  );
};

export default SelectPerfil;
