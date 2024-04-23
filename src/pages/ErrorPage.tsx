import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message: string };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        marginTop: "5rem",
        gap: 2,
      }}
    >
      <Typography
        variant="h1"
        fontWeight={"bold"}
        fontSize={"4rem"}
        textAlign={"center"}
      >
        Oops!
      </Typography>
      <Typography variant="h2" fontSize={"2rem"} textAlign={"center"}>
        Desculpe, ocorreu um erro inesperado.
      </Typography>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>

      <a href="/">Voltar à página inicial</a>
    </Container>
  );
}
