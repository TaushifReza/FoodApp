import { useState } from "react";
import userLogin from "./UserLogin";

const UserLoginProvider = ({children})=>{
    const [loggedin, setloggedin]= useState(false);
    const [Userdata, setUserdata] = useState(null);
    const [LoginToken, setLoginToken]= useState(null);
    return(
        <userLogin.Provider value={{loggedin,setloggedin,Userdata, setUserdata, LoginToken,setLoginToken}}>
           {children} 
        </userLogin.Provider>
    )
}

export default UserLoginProvider;