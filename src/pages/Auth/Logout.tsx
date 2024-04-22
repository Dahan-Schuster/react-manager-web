import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Limpa o estado de autenticação
 */
const Logout: React.FunctionComponent = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout(() => {
      window.location.href = "/login";
    });
  }, [logout]);

  return null;
};

export default Logout;
