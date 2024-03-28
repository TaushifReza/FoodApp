import { useState } from "react";
import userLogin from "./UserLogin";

const UserLoginProvider = ({children})=>{
    const [loggedin, setloggedin]= useState(false);
    return(
        <userLogin.Provider value={{loggedin,setloggedin}}>
           {children} 
        </userLogin.Provider>
    )
}

export default UserLoginProvider;