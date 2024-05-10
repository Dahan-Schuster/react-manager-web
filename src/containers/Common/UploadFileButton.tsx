import { Upload } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import HiddenInput from "../../components/HiddenInput";

interface UploadFileButtonProps {
  label: string;
  onUpload: (value: File | null) => void;
  file: File | null;
  accept?: string;
}

/**
 * Botão de upload de imagem do tema
 */
const UploadFileButton: FC<UploadFileButtonProps> = ({
  label,
  onUpload,
  file,
  accept,
}) => {
  return (
    <FormControl
      sx={{
        minHeight: 56,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<Upload />}
      >
        {label}
        <HiddenInput
          type="file"
          onChange={(e) => onUpload(e.target.files?.[0] || null)}
          accept={accept}
        />
      </Button>
      <Box
        sx={{
          ml: 2,
          display: "block",
          overflow: "hidden",
          flex: 1,
        }}
      >
        <Tooltip title={file?.name}>
          <Typography
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {file?.name}
          </Typography>
        </Tooltip>
      </Box>
    </FormControl>
  );
};

export default UploadFileButton;
