/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import {  useNavigate } from "react-router-dom";



const Login = () => {
    const navigate = useNavigate()
    
    const {googleLogin,setUser,user} = useContext(AuthContext)
   
    const handleGoogle = ()=>{
        googleLogin()
        .then(users=>{
            setUser(users.user)
          
           
            navigate('/')
        })
    }
   
    return (
        <div className="h-screen flex flex-col gap-4 items-center justify-center">
            <p className="uppercase font-semibold">Login first using this TO-DO list</p>
           <button className="flex items-center font-semibold gap-2 px-4 py-2 border-gray-700 border rounded-sm" onClick={handleGoogle}><img className="w-10" src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"  /> <p>Continue With Google</p></button>
        </div>
    );
};

export default Login;