import { Box, Button, Grid, TextField } from "@mui/material";
import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import AuthContainer from "../../containers/Auth/AuthContainer";
import { useAuth } from "../../contexts/AuthContext";
import usePageTitle from "../../hooks/usePageTitle";
import { toast } from "react-toastify";

/**
 * Página de requisição de recuperação de senha via e-mail
 */
const EsqueciSenha: React.FunctionComponent = () => {
  usePageTitle("Recuperar senha");
  const { sendResetPasswordEmail, loading } = useAuth();

  const [email, setEmail] = React.useState<string>("");

  const handleSubmit = React.useCallback(
    async (e: FormEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!email) {
        toast.error("Preencha o e-mail");
        return;
      }

      const error = await sendResetPasswordEmail(email);
      if (error) {
        toast.error(error);
      } else {
        toast.success("E-mail enviado!");
      }
    },
    [email, sendResetPasswordEmail]
  );

  return (
    <AuthContainer title="Recuperar senha">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          id="email"
          placeholder="E-mail"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          Enviar e-mail
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/login">Voltar para login</Link>
          </Grid>
        </Grid>
      </Box>
    </AuthContainer>
  );
};

export default EsqueciSenha;
