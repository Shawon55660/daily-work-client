/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";
import Loader from "../pages/Loader";


const Private = ({children}) => {
    const {user,loader} = useContext(AuthContext)
    
    if(loader){
        return <Loader></Loader>
    }
    if(user) return children

return <Navigate to='/'></Navigate>
};

export default Private;