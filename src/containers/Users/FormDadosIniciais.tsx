import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Form, Formik, FormikHelpers } from "formik";

import Typography from "@mui/material/Typography";
import {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { commonTextFieldProps } from "../../constants";
import { useUsers } from "../../contexts/UsersContext";
import useUserPermissions from "../../hooks/useUserPermissions";

interface FormDadosIniciaisProps {
  user: Users.UserType;
  setUser: Dispatch<SetStateAction<Users.UserType>>;
  onCreate?: (user: Users.UserType) => void;
  closeModal?: VoidFunction;
  loadingId?: boolean;
}

/**
 * Form de dados iniciais do usuário
 */
const FormDadosIniciais: FC<FormDadosIniciaisProps> = ({
  user,
  setUser,
  onCreate,
  closeModal,
  loadingId,
}) => {
  const { createUser, updateUser, loadingUsers } = useUsers();
  const { has } = useUserPermissions();

  const [error, setError] = useState<string>("");

  const [initialValues, setInitialValues] = useState<Users.SaveUserValues>({
    nome: "",
    email: "",
  });

  useEffect(() => {
    if (user?.id) {
      setInitialValues({
        nome: user?.nome || "",
        email: user?.email || "",
      });
    }
  }, [user?.id]);

  const handleSubmit = useCallback(
    async (
      values: Users.SaveUserValues,
      { setSubmitting }: FormikHelpers<Users.SaveUserValues>
    ) => {
      setError("");
      setSubmitting(true);

      let res: Common.CommonResponse = { success: false };
      if (user.id) {
        res = await updateUser(user.id, values);
      } else {
        res = await createUser(values);
      }
      if (res.success) {
        const resUser = res.user as Users.UserType;
        closeModal && closeModal();
        onCreate && onCreate(resUser);
        setUser(resUser);
      }

      setSubmitting(false);
    },
    [closeModal, onCreate, createUser, user]
  );

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ getFieldProps }) => {
        return (
          <Form>
            {!!error && <Typography color="error">{error}</Typography>}
            <Grid container spacing={1}>
              {(!user.id || (!!user.id && has("usuarios-editar"))) && (
                <Fragment>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoFocus
                      label="Nome"
                      {...commonTextFieldProps}
                      {...getFieldProps("nome")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="E-mail"
                      {...commonTextFieldProps}
                      {...getFieldProps("email")}
                    />
                  </Grid>
                </Fragment>
              )}
              <Grid
                item
                xs={12}
                mt={2}
                display="flex"
                justifyContent="flex-end"
              >
                {!!closeModal && (
                  <Button
                    color="secondary"
                    variant="contained"
                    type="button"
                    onClick={closeModal}
                    sx={{ marginRight: 2 }}
                  >
                    Cancelar
                  </Button>
                )}
                {(!user.id || (!!user.id && has("usuarios-editar"))) && (
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={loadingUsers || loadingId}
                  >
                    {user.id ? "Salvar" : "Cadastrar"}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormDadosIniciais;
