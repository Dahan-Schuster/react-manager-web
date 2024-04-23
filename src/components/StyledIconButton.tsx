import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const StyledIconButton = styled(IconButton, {
  shouldForwardProp() {
    return true;
  },
})(({ theme, color }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.default,
  color: color || theme.palette.text.secondary,
  transition: "all 0.125s ease-in",

  "&:hover": {
    backgroundColor: theme.palette.background.default,
    filter: "brightness(60%)",
  },

  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));

export default StyledIconButton;
