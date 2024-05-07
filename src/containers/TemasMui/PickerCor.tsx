import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { ChromePicker, SliderPicker } from "react-color";

interface PickerCorProps {
  label: string;
  cor: string;
  onChange: (v: string) => void;
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

const PickerCor: FC<PickerCorProps> = ({ cor, label, onChange }) => {
  const [corState, setCorState] = useState(cor);

  const [openPicker, setOpenPicker] = useState(false);

  const handleClose = useCallback(() => {
    setOpenPicker(false);
  }, []);

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
            id={`input-cor-${label}`}
            margin="dense"
            fullWidth
            value={cor}
            readOnly
            onClick={() => setOpenPicker(true)}
          />
        </CustomWidthTooltip>
      </FormControl>
    </ClickAwayListener>
  );
};

export default PickerCor;
