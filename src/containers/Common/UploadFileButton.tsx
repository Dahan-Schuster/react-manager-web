import { Upload } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { FC, useEffect, useMemo, useRef } from "react";
import HiddenInput from "../../components/HiddenInput";
import FormHelperText from "@mui/material/FormHelperText";
import useFormatBytes from "../../hooks/useFormatBytes";
import { toast } from "react-toastify";

interface UploadFileButtonProps {
  label: string;
  onUpload: (value: File | null) => void;
  file: File | null;
  accept?: string;
  maxSizeBytes?: number;
}

/**
 * Botão de upload de imagem do tema
 */
const UploadFileButton: FC<UploadFileButtonProps> = ({
  label,
  onUpload,
  file,
  accept,
  maxSizeBytes: maxSize,
}) => {
  const { formatBytes } = useFormatBytes();

  useEffect(() => {
    if (!file || !maxSize) return;

    if (file.size > maxSize) {
      toast.error(
        `O tamanho do ${label} deve ser menor que ${formatBytes(
          maxSize
        )}. Arquivo enviado: ${formatBytes(file.size)}`
      );
      onUpload(null);
    }
  }, [file, maxSize]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const dataTransfer = new DataTransfer();
      !!file && dataTransfer.items.add(file);
      inputRef.current.files = dataTransfer.files;
    }
  }, [file]);

  return (
    <FormControl
      sx={{
        minHeight: 56,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: 1,
      }}
    >
      <Box
        sx={{
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
            ref={inputRef}
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
      </Box>
    </FormControl>
  );
};

export default UploadFileButton;
