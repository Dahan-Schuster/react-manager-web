import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Form, Formik, FormikHelpers } from "formik";
import SelectPerfil from "../../containers/Perfis/SelectPerfil";

import Typography from "@mui/material/Typography";
import { FC, Fragment, useCallback, useState } from "react";
import { useUsers } from "../../contexts/UsersContext";
import useDebounceEffect from "../../hooks/useDebonceEffect";
import useUserPermissions from "../../hooks/useUserPermissions";

const inputsMargin = "normal";

const commonTextFieldProps: Partial<TextFieldProps> = {
  margin: inputsMargin,
  fullWidth: true,
  autoComplete: "off",
};

interface CreateUserFormProps {
  id?: number;
  closeModal?: VoidFunction;
}

const SaveUserForm: FC<CreateUserFormProps> = ({ id, closeModal }) => {
  const { createUser, updateUser, changePerfilUser, loadingUsers, showUser } =
    useUsers();
  const { has } = useUserPermissions();

  const [loadingId, setLoadingId] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [initialValues, setInitialValues] = useState<Users.SaveUserValues>({
    nome: "",
    email: "",
    perfil_id: 0,
  });

  useDebounceEffect(
    () => {
      if (!id) return;
      setLoadingId(true);
      showUser(id)
        .then((res) => {
          if (!res.success && !!closeModal) closeModal();
          setInitialValues({
            nome: res.user?.nome || "",
            email: res.user?.email || "",
            perfil_id: res.user?.perfil_id || 0,
          });
        })
        .finally(() => setLoadingId(false));
    },
    [id],
    50
  );

  const handleSubmit = useCallback(
    async (
      values: Users.SaveUserValues,
      { setSubmitting }: FormikHelpers<Users.SaveUserValues>
    ) => {
      setError("");
      setSubmitting(true);

      let res: Common.CommonResponse = { success: false };
      if (id) {
        res = await updateUser(id, values);
      } else {
        res = await createUser(values);
      }
      if (res.success) {
        closeModal && closeModal();
      }

      setSubmitting(false);
    },
    [closeModal, createUser]
  );

  const handleSubmitPerfil = useCallback(
    (perfilId: number) => {
      if (!id) return;
      changePerfilUser(id, perfilId);
    },
    [id]
  );

  return (
    <Box>
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
                {(!id || (!!id && has("usuarios-editar"))) && (
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
                        if (id) {
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
                  {(!id || (!!id && has("usuarios-editar"))) && (
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
    </Box>
  );
};

export default SaveUserForm;
