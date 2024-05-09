import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Form, Formik, FormikHelpers } from "formik";
import SelectPerfil from "../../containers/Perfis/SelectPerfil";

import Typography from "@mui/material/Typography";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { commonTextFieldProps, inputsMargin } from "../../constants";
import { useUsers } from "../../contexts/UsersContext";
import useUserPermissions from "../../hooks/useUserPermissions";

interface FormDadosIniciaisProps {
  user: Users.UserType;
  closeModal?: VoidFunction;
  loadingId?: boolean;
}

/**
 * Form de dados iniciais do usuário
 */
const FormDadosIniciais: FC<FormDadosIniciaisProps> = ({
  user,
  closeModal,
  loadingId,
}) => {
  const { createUser, updateUser, changePerfilUser, loadingUsers } = useUsers();
  const { has } = useUserPermissions();

  const [error, setError] = useState<string>("");

  const [initialValues, setInitialValues] = useState<Users.SaveUserValues>({
    nome: "",
    email: "",
    perfil_id: 0,
  });

  useEffect(() => {
    if (user?.id) {
      setInitialValues({
        nome: user?.nome || "",
        email: user?.email || "",
        perfil_id: user?.perfil_id || 0,
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
        closeModal && closeModal();
      }

      setSubmitting(false);
    },
    [closeModal, createUser, user]
  );

  const handleSubmitPerfil = useCallback(
    (perfilId: number) => {
      if (!user.id) return;
      changePerfilUser(user.id, perfilId);
    },
    [user.id]
  );
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ getFieldProps, setFieldValue }) => {
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
              {has("usuarios-alterar-permissao") && (
                <Grid item xs={12} sm={12}>
                  <SelectPerfil
                    label="Perfil do usuário"
                    size="medium"
                    margin={inputsMargin}
                    optional
                    emptyLabel="Sem perfil"
                    {...getFieldProps("perfil_id")}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFieldValue("perfil_id", value);
                      if (user.id) {
                        handleSubmitPerfil(value as number);
                      }
                    }}
                  />
                </Grid>
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
                    Enviar
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
