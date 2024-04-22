import { FormEvent, FunctionComponent, useCallback, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContainer from "../../containers/Auth/AuthContainer";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import usePageTitle from "../../hooks/usePageTitle";

interface LoginProps {}

/**
 * Página de login
 */
const Login: FunctionComponent<LoginProps> = () => {
  usePageTitle("Login");

  const navigate = useNavigate();
  const location = useLocation();
  const from: string = location.state?.from?.pathname || "/";

  const { loading, login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (!email || !password) {
        toast.error("Preencha todos os campos");
        return;
      }

      const error = await login({
        email,
        password,
        callback: () => {
          // redireciona de volta para a página anterior, removendo a página
          // de login do histórico
          navigate(from, { replace: true });
        },
      });
      if (error) toast.error(error);
    },
    [email, password, login, navigate, from]
  );

  return (
    <AuthContainer title="Login">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          id="username"
          placeholder="E-mail"
          name="username"
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
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          Entrar
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/esqueci-minha-senha">Esqueceu sua senha?</Link>
          </Grid>
        </Grid>
      </Box>
    </AuthContainer>
  );
};

export default Login;
