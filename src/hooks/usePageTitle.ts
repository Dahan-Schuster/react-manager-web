import React from "react";

import config from "../config";

/**
 * Define o titulo da pagina
 */
const usePageTitle = (title: string) => {
  const originalTitle = React.useRef<string>(config.appTitle).current;

  React.useEffect(() => {
    document.title = title + ` | ${config.appTitle}`;

    return () => {
      document.title = originalTitle;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
};

export default usePageTitle;
