import { Formik, Form, FormikHelpers } from "formik";
import Box from "@mui/material/Box";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SelectPerfil from "../../containers/Perfis/SelectPerfil";

import { FC, useCallback, useState } from "react";
import Typography from "@mui/material/Typography";
import { useUsers } from "../../contexts/UsersContext";
import { toast } from "react-toastify";

const inputsMargin = "normal";

const commonTextFieldProps: Partial<TextFieldProps> = {
  margin: inputsMargin,
  fullWidth: true,
  autoComplete: "off",
};

interface CreateUserFormProps {
  closeModal?: VoidFunction;
}

const CreateUserForm: FC<CreateUserFormProps> = ({ closeModal }) => {
  const { createUser, loadingUsers } = useUsers();

  const [error, setError] = useState<string>("");

  const handleSubmit = useCallback(
    async (
      values: Users.CreateUserValues,
      { setSubmitting }: FormikHelpers<Users.CreateUserValues>
    ) => {
      setError("");
      setSubmitting(true);
      const res = await createUser(values);
      if (res.success) {
        closeModal && closeModal();
      }

      setSubmitting(false);
    },
    [closeModal, createUser]
  );

  return (
    <Box>
      <Formik
        initialValues={{
          nome: "",
          email: "",
          perfilId: 0,
        }}
        onSubmit={handleSubmit}
      >
        {({ getFieldProps, setFieldValue }) => {
          return (
            <Form>
              {!!error && <Typography color="error">{error}</Typography>}
              <Grid container spacing={1}>
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
                <Grid item xs={12} sm={6}>
                  <SelectPerfil
                    label="Perfil do usuário"
                    size="medium"
                    margin={inputsMargin}
                    optional
                    {...getFieldProps("perfil_id")}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFieldValue("perfil_id", value);
                    }}
                  />
                </Grid>
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
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={loadingUsers}
                  >
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default CreateUserForm;
