import { useState } from "react";
import userLogin from "./UserLogin";

const UserLoginProvider = ({children})=>{
    const [loggedin, setloggedin]= useState(false);
    const [Userdata, setUserdata] = useState(null);
    return(
        <userLogin.Provider value={{loggedin,setloggedin,Userdata, setUserdata}}>
           {children} 
        </userLogin.Provider>
    )
}

export default UserLoginProvider;