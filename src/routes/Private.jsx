/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";


const Private = ({children}) => {
    const {user,loader} = useContext(AuthContext)
   
    if(loader){
        return <div>Loading......</div>
    }
   return user? children: <Navigate to='/login'></Navigate>
};

export default Private;