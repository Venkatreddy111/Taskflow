import { defaultUser } from "../constants/defaultUser";
import { useStorageState } from "../hooks/useStorageState";
import { UserContext } from "./UserContext";
export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useStorageState(defaultUser, "user");
    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
