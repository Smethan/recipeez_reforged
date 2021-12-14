import React from "react";
import { IUser } from "../type";

const UserContext = React.createContext<IUser>({} as IUser)

export default UserContext;