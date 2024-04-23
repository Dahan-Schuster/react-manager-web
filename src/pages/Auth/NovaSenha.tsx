import { Box, Button, Grid, TextField } from "@mui/material";
import React, { FormEvent } from "react";
import { Link, redirect, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContainer from "../../containers/Auth/AuthContainer";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Página de alteração de senha uasndo token recebido por email
 */
const NovaSenha: React.FunctionComponent = () => {
  const { token } = useParams();

  const { resetPassword, loading } = useAuth();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] =
    React.useState<string>("");

  const handleSubmit = React.useCallback(
    async (e: FormEvent<HTMLDivElement>) => {
      e.preventDefault();
      let error: string | undefined;

      if (!email || !password || !passwordConfirmation || !token) {
        error = "Preencha todos os campos";
        return;
      }

      if (password !== passwordConfirmation) {
        error = "As senhas devem ser iguais";
        return;
      }

      if (!error) {
        error = await resetPassword(
          email,
          password,
          passwordConfirmation,
          token
        );
      }

      if (error) {
        toast.error(error);
      } else {
        toast.success("Senha alterada!");
      }
    },
    [email, password, passwordConfirmation, resetPassword, token]
  );

  React.useEffect(() => {
    if (!token) {
      redirect("/login");
    }
  }, [token]);

  return (
    <AuthContainer title="Alterar senha">
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
        <TextField
          margin="normal"
          fullWidth
          name="password"
          placeholder="Senha"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          name="password"
          placeholder="Confirme a senha"
          type="password"
          id="password-confirmation"
          autoComplete="current-password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <Button
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          Alterar Senha
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

export default NovaSenha;
