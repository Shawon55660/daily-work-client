/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";


export const AuthContext = createContext()


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)
    const googleLogin = ()=>{
        setLoader(true)
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth,provider)
    }
    const authInfo = {
        user,setUser,loader,setLoader,googleLogin
    }
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, async user => {
            if(user?.email){
                setUser(user)
                setLoader(false)
                
            }
            
            
        })
        return () => {
            return unsubcribe()
        }
        
       
    }, [])
    return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;