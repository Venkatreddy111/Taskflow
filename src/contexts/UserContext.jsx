import { createContext } from "react";
import { defaultUser } from "../constants/defaultUser";
export const UserContext = createContext({ user: defaultUser, setUser: () => { } });
