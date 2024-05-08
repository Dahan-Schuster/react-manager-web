import styled from "@emotion/styled";
import { Clear } from "@mui/icons-material";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import {
  FC,
  Fragment,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ChromePicker, SliderPicker } from "react-color";

interface PickerCorProps {
  label: string;
  cor: string;
  onChange: (v: string) => void;
  default?: string;
}

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    padding: 12,
    background: "#2a2a2a",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#2a2a2a",
  },
});

const PickerCor: FC<PickerCorProps> = ({
  cor,
  default: defaultCor,
  label,
  onChange,
}) => {
  const [corState, setCorState] = useState(cor || defaultCor);

  const [openPicker, setOpenPicker] = useState(false);

  const handleClose = useCallback(() => {
    setOpenPicker(false);
  }, []);

  const handleReset = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onChange(defaultCor || "");
    },
    [defaultCor]
  );

  useEffect(() => {
    setCorState(cor);
  }, [cor]);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <FormControl key={label} fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor={`input-cor-${label}`}>{label}</InputLabel>
        <CustomWidthTooltip
          open={openPicker}
          onClose={handleClose}
          PopperProps={{
            disablePortal: true,
          }}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          arrow
          title={
            <Fragment>
              <Box mb={2}>
                <SliderPicker
                  color={corState}
                  onChange={(v) => setCorState(v.hex)}
                  onChangeComplete={(v) => onChange(v.hex)}
                  styles={{ default: { hue: { width: "300px" } } }}
                />
              </Box>
              <Box mb={1} sx={{ display: "flex", justifyContent: "center" }}>
                <ChromePicker
                  disableAlpha
                  color={corState}
                  onChange={(v) => setCorState(v.hex)}
                  onChangeComplete={(v) => onChange(v.hex)}
                />
              </Box>
            </Fragment>
          }
        >
          <Input
            margin="dense"
            fullWidth
            value={cor}
            readOnly
            onClick={() => setOpenPicker(true)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleReset}>
                  <Clear fontSize="inherit" />
                </IconButton>
              </InputAdornment>
            }
          />
        </CustomWidthTooltip>
      </FormControl>
    </ClickAwayListener>
  );
};

export default PickerCor;
