import { FC, ReactNode } from "react";

interface WithContextProps {
  provider: FC<{ children: ReactNode }>;
  children: ReactNode;
}

/**
 * Container para definir uma página que será renderizada dentro de um contexto
 */
const WithContext: FC<WithContextProps> = ({ provider, children }) => {
  const Provider = provider;
  return <Provider>{children}</Provider>;
};

export default WithContext;
