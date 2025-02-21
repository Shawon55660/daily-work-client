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
   return user? children: <Navigate to='/login'></Navigate>
};

export default Private;