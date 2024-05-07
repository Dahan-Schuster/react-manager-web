import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
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
import { FC, useState } from "react";
import { MuiPaletteNames } from "../../constants";
import Paper from "@mui/material/Paper";

interface PanelPrevisualizarTemaProps {}

/**
 * Painel de previsualização do tema em edição
 */
const PanelPrevisualizarTema: FC<PanelPrevisualizarTemaProps> = () => {
  const [textValue, setTextValue] = useState("Olá, mundo!");
  const [selectValue, setSelectValue] = useState("");

  return (
    <Box
      sx={{
        height: "100%",
        p: 1,
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Typography variant="h5" color="text.primary">
        Botões
      </Typography>
      <Grid container spacing={1} my={1} px={1}>
        {(
          [
            "primary",
            "secondary",
            "error",
            "warning",
            "info",
            "success",
          ] as const
        ).map((color) => (
          <Grid item xs={12} sm={4} md={2} key={color}>
            <Button variant="contained" fullWidth color={color}>
              {MuiPaletteNames[color]}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" color="text.primary">
        Inputs
      </Typography>
      <Grid
        container
        spacing={1}
        my={1}
        px={1}
        sx={{
          "& .MuiTypography-root": {
            color: (theme) => theme.palette.text.secondary,
          },
        }}
      >
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            error={!textValue}
            id="example-input"
            label="Texto"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            helperText={!textValue && "Digite um texto"}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Selecione</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectValue}
              label="Age"
              onChange={(e) => setSelectValue(e.target.value as string)}
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
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" color="text.primary">
        Conteúdo
      </Typography>
      <Grid container spacing={1} my={1} px={1}>
        <Grid item xs={12} sm={4} md={2}>
          <BasicCard />
        </Grid>
        <Grid item xs={12} sm={8} md={10}>
          <BasicTable />
        </Grid>
      </Grid>
    </Box>
  );
};

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
