import { FC } from "react";
import SelectInput, { SelectInputProps } from "../../components/SelectInput";

const statusUser = [
  { label: "Ativo", value: 1 },
  { label: "Inativo", value: 0 },
];

const SelectStatus: FC<SelectInputProps> = (props) => {
  return (
    <SelectInput
      {...props}
      emptyLabel="Todos"
      emptyValue={""}
      values={statusUser}
    />
  );
};

export default SelectStatus;
