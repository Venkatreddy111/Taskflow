import { Box } from "@mui/material";
import { createContext, useContext } from "react";
const TabGroupContext = createContext(undefined);
export const TabGroupProvider = ({ name, value, children }) => {
    return <TabGroupContext.Provider value={{ name, value }}>{children}</TabGroupContext.Provider>;
};
const useTabGroupContext = () => {
    const context = useContext(TabGroupContext);
    if (!context) {
        throw new Error("TabPanel must be used within a TabGroupProvider.");
    }
    return context;
};
export function TabPanel({ children, index, ...other }) {
    const { name, value } = useTabGroupContext();
    return (<Box role="tabpanel" hidden={value !== index} id={`${name}-tabpanel-${index}`} aria-labelledby={`${name}-tab-${index}`} style={{ overflowX: "hidden" }} {...other}>
      {value === index && <Box>{children}</Box>}
    </Box>);
}
