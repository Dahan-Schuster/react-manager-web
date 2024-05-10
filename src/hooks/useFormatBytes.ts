import { useCallback } from "react";

interface FormatBytesProps {
  formatBytes: (bytes: string | number, decimals?: number) => string;
}

const sizes = ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

/**
 * hook que formata tamanho em bytes para uma string humanizada
 */
const useFormatBytes = (): FormatBytesProps => {
  const formatBytes = useCallback((bytes: string | number, decimals = 0) => {
    bytes = +bytes;
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }, []);

  return {
    formatBytes,
  };
};

export default useFormatBytes;
