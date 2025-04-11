import { useContext } from "react"
import { CustomerAuthContext } from "./context/CustomerAuth";
import { Navigate } from "react-router-dom";

export const CustomerRequireAuth = ({children}) => {
    const {user} = useContext(CustomerAuthContext);

    if(!user){
        return <Navigate to={`/account/login`} />
    }

    return children;
}