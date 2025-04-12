
import { createContext, useState } from "react";

export const CustomerAuthContext = createContext();

export const CustomerAuthProvider = ({ children }) => {
    const userInfo = localStorage.getItem('userInfo');
    const [user, setUser] = useState(userInfo);

    const login = (user) => {
        setUser(user);
    }

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    }

    return <CustomerAuthContext.Provider value={{ user, login, logout }}>
        {children}
    </CustomerAuthContext.Provider>


}