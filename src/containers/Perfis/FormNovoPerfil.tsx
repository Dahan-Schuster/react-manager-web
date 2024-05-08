import TextField from "@mui/material/TextField";
import { Form, Formik } from "formik";
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import CustomDialog from "../../components/CustomDialog";
import Button from "@mui/material/Button";
import { usePerfis } from "../../contexts/PerfisContext";
import useDebounceEffect from "../../hooks/useDebonceEffect";

interface FormNovoPerfilProps {
  id?: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * Formulário de criação de perfil
 */
const FormNovoPerfil: FC<FormNovoPerfilProps> = ({ id, open, setOpen }) => {
  const { criarPerfil, updatePerfis, showPerfil } = usePerfis();
  const [loading, setLoading] = useState<boolean>(false);
  const [perfil, setPerfil] = useState<Perfis.CreatePerfilValues>({ nome: "" });

  useDebounceEffect(() => {
    if (id) showPerfil(id).then((response) => setPerfil(response.perfil));
  }, []);

  const handleSubmit = useCallback(
    (values: Perfis.CreatePerfilValues, close = true) => {
      setLoading(true);

      if (id) {
        updatePerfis(id, values).finally(() => {
          setLoading(false);
        });
      } else {
        criarPerfil(values).finally(() => {
          setLoading(false);
          close && setOpen(false);
        });
      }
    },
    []
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
              title="Criar perfil"
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
                  {id ? "Salvar" : "Criar"}
                </Button>,
                !id && (
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

export default FormNovoPerfil;
