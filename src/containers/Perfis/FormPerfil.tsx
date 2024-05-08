import TextField from "@mui/material/TextField";
import { Form, Formik } from "formik";
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import CustomDialog from "../../components/CustomDialog";
import Button from "@mui/material/Button";
import { usePerfis } from "../../contexts/PerfisContext";
import useDebounceEffect from "../../hooks/useDebonceEffect";
import { toast } from "react-toastify";

interface FormNovoPerfilProps {
  perfil?: Perfis.PerfilType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * Formulário de criação de perfil
 */
const FormPerfil: FC<FormNovoPerfilProps> = ({
  perfil: _perfil,
  open,
  setOpen,
}) => {
  const { criarPerfil, updatePerfis, showPerfil } = usePerfis();
  const [loading, setLoading] = useState<boolean>(false);
  const [perfil, setPerfil] = useState<Perfis.CreatePerfilValues>(
    _perfil || { nome: "" }
  );

  useDebounceEffect(() => {
    if (_perfil?.id && open)
      showPerfil(_perfil.id).then((response) => setPerfil(response.perfil));
  }, [_perfil?.id, open]);

  const handleSubmit = useCallback(
    (values: Perfis.CreatePerfilValues, close = true) => {
      setLoading(true);

      if (_perfil?.id) {
        updatePerfis(_perfil.id, values)
          .then((res) => {
            res.success && toast.success("Perfil salvo!");
          })
          .finally(() => {
            setLoading(false);
            setOpen(false);
          });
      } else {
        criarPerfil(values)
          .then((res) => {
            res.success && toast.success("Perfil criado!");
          })
          .finally(() => {
            setLoading(false);
            close && setOpen(false);
          });
      }
    },
    [_perfil?.id]
  );

  return (
    <Formik
      initialValues={perfil}
      enableReinitialize
      onSubmit={(v) => handleSubmit(v, false)}
    >
      {({ getFieldProps, values }) => {
        return (
          <Form>
            <CustomDialog
              open={open}
              title={_perfil?.id ? "Editar perfil" : "Criar perfil"}
              actions={[
                <Button
                  disabled={loading}
                  onClick={loading ? undefined : () => setOpen(false)}
                >
                  Fechar
                </Button>,
                <Button
                  disabled={loading}
                  onClick={
                    loading ? undefined : () => handleSubmit(values, false)
                  }
                >
                  {_perfil?.id ? "Salvar" : "Criar"}
                </Button>,
                !_perfil?.id && (
                  <Button
                    disabled={loading}
                    onClick={
                      loading ? undefined : () => handleSubmit(values, true)
                    }
                  >
                    Criar e fechar
                  </Button>
                ),
              ]}
            >
              <TextField
                autoFocus
                label="Nome"
                fullWidth
                {...getFieldProps("nome")}
              />
            </CustomDialog>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormPerfil;
