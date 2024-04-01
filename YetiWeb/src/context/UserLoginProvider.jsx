import { useState } from "react";
import userLogin from "./UserLogin";

const UserLoginProvider = ({children})=>{
    const [loggedin, setloggedin]= useState(false);
    const [Userdata, setUserdata] = useState(null);
    const [LoginToken, setLoginToken]= useState(null);
    const [UserProfiledata, setUserProfiledata] = useState(null);
    const [newdata, setnewdata] = useState(false);
    return(
        <userLogin.Provider value={{loggedin,setloggedin,Userdata, setUserdata, LoginToken,
        setLoginToken, UserProfiledata,setUserProfiledata, newdata, setnewdata}}>
           {children} 
        </userLogin.Provider>
    )
}

export default UserLoginProvider;