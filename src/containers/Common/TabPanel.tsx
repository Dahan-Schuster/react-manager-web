import { FC } from "react";

interface TabPanelProps {
  value: number;
  index: number;
  group: string;
  children?: React.ReactNode;
}

/**
 * Wrapper para paineis de conteúdo das Tabs do MUI
 */
const TabPanel: FC<TabPanelProps> = ({ index, value, group, children }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${group}-${index}`}
      aria-labelledby={`${group}-${index}`}
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;
