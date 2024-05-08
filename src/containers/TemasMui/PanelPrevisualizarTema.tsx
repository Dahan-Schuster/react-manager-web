import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { MuiPaletteNames } from "../../constants";
import SimpleAccordion from "../SimpleAccordion";
import BoxFaviconTema from "./BoxFaviconTema";
import HeaderTema from "./HeaderTema";
import LoginTema from "./LoginTema";
import Alert, { AlertColor } from "@mui/material/Alert";
import MenuTema from "./MenuTema";

interface PanelPrevisualizarTemaProps {
  tema: Mui.Theme;
  fileFavicon: File | null;
  fileLogoHeader: File | null;
  fileLogoLogin: File | null;
}

/**
 * Painel de previsualização do tema em edição
 */
const PanelPrevisualizarTema: FC<PanelPrevisualizarTemaProps> = ({
  tema,
  fileFavicon,
  fileLogoHeader,
  fileLogoLogin,
}) => {
  return (
    <Box
      sx={{
        height: "100%",
        p: 1,
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <SimpleAccordion label="Layout">
        <Grid
          container
          spacing={1}
          my={1}
          p={1}
          sx={{ backgroundColor: (theme) => theme.palette.background.default }}
        >
          <Grid item xs={12}>
            <BoxFaviconTema tema={tema} file={fileFavicon} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <HeaderTema tema={tema} file={fileLogoHeader} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MenuTema tema={tema} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <LoginTema tema={tema} file={fileLogoLogin || fileLogoHeader} />
          </Grid>
        </Grid>
      </SimpleAccordion>
      <SimpleAccordion label="Botões">
        <Grid
          container
          spacing={1}
          my={1}
          p={1}
          sx={{ backgroundColor: (theme) => theme.palette.background.default }}
        >
          <ButtonsGrid variant="contained" />
          <ButtonsGrid variant="outlined" />
          <ButtonsGrid variant="text" />
        </Grid>
      </SimpleAccordion>
      <SimpleAccordion label="Alertas">
        <Grid
          container
          spacing={1}
          my={1}
          p={1}
          sx={{ backgroundColor: (theme) => theme.palette.background.default }}
        >
          <AlertsGrid variant="filled" />
          <AlertsGrid variant="outlined" />
          <AlertsGrid variant="standard" />
        </Grid>
      </SimpleAccordion>
      <SimpleAccordion label="Inputs">
        <Grid
          container
          spacing={1}
          my={1}
          p={1}
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            "& .MuiTypography-root": {
              color: (theme) => theme.palette.text.secondary,
            },
          }}
        >
          <Grid item xs={12} sm={6} md={2}>
            <TextField label="Texto" fullWidth defaultValue="Olá, mundo!" />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Selecione</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select"
                defaultValue=""
              >
                <MenuItem value={""}>Selecione</MenuItem>
                <MenuItem value={"1"}>Opção 1</MenuItem>
                <MenuItem value={"2"}>Opção 2</MenuItem>
                <MenuItem value={"3"} disabled>
                  Opção inativa
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              error
              label="Erro"
              helperText="Input com erro"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Checkbox"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="s"
                name="radio-buttons-group"
              >
                <FormControlLabel value="s" control={<Radio />} label="Sim" />
                <FormControlLabel value="n" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <FormGroup>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Switch"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </SimpleAccordion>
      <SimpleAccordion label="Conteúdo">
        <Grid
          container
          spacing={1}
          my={1}
          p={1}
          sx={{ backgroundColor: (theme) => theme.palette.background.default }}
        >
          <Grid item xs={12} sm={4} md={3}>
            <BasicCard />
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <BasicTable />
          </Grid>
        </Grid>
      </SimpleAccordion>
      <SimpleAccordion label="Texto">
        <Grid container spacing={1} my={1}>
          <Grid item xs={12} sm={4} md={4}>
            <Typography fontSize={30} color="text.primary">
              Primário
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography fontSize={30} color="text.secondary">
              Secundário
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography fontSize={30} color="text.disabled">
              Inativo
            </Typography>
          </Grid>
        </Grid>
      </SimpleAccordion>
    </Box>
  );
};

function ButtonsGrid({
  variant,
}: {
  variant: "text" | "outlined" | "contained";
}) {
  return (
    <>
      {Object.keys(MuiPaletteNames).map((color) => (
        <Grid item xs={12} sm={4} md={2} key={color}>
          <Button
            variant={variant}
            fullWidth
            color={color as Mui.PaletteOptions}
          >
            {MuiPaletteNames[color as Mui.PaletteOptions]}
          </Button>
        </Grid>
      ))}
    </>
  );
}

function AlertsGrid({
  variant,
}: {
  variant: "standard" | "filled" | "outlined";
}) {
  return (
    <>
      {Object.keys(MuiPaletteNames).map((color) => {
        if (["primary", "secondary"].includes(color)) return null;
        return (
          <Grid item xs={12} sm={4} md={3} key={color}>
            <Alert variant={variant} severity={color as AlertColor}>
              {MuiPaletteNames[color as Mui.PaletteOptions]}
            </Alert>
          </Grid>
        );
      })}
    </>
  );
}

function BasicCard() {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Exemplo
        </Typography>
        <Typography variant="h5" component="div">
          Card padrão
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          loren ipsum
        </Typography>
        <Typography variant="body2">dolor sit amet.</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Mais info</Button>
      </CardActions>
    </Card>
  );
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Linha 1", 159, 6.0, 24, 4.0),
  createData("Linha 2", 237, 9.0, 37, 4.3),
  createData("Linha 3", 262, 16.0, 24, 6.0),
  createData("Linha 4", 305, 3.7, 67, 4.3),
  createData("Linha 5", 356, 16.0, 49, 3.9),
];

function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tabela Exemplo</TableCell>
            <TableCell align="right">Coluna 1</TableCell>
            <TableCell align="right">Coluna 2</TableCell>
            <TableCell align="right">Coluna 3</TableCell>
            <TableCell align="right">Coluna 4</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PanelPrevisualizarTema;
