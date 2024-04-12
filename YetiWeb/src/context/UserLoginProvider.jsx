import { useState } from "react";
import userLogin from "./UserLogin";

const UserLoginProvider = ({children})=>{
    const [loggedin, setloggedin]= useState(false);
    const [Userdata, setUserdata] = useState(null);
    const [LoginToken, setLoginToken]= useState(null);
    const [UserProfiledata, setUserProfiledata] = useState(null);
    const [Categorynewdata, setCategorynewdata] = useState(false);
     const [itemnewdata, setitemnewdata] = useState(false);
    return (
      <userLogin.Provider
        value={{
          loggedin,
          setloggedin,
          Userdata,
          setUserdata,
          LoginToken,
          setLoginToken,
          UserProfiledata,
          setUserProfiledata,
          Categorynewdata,
          setCategorynewdata,
          itemnewdata,
          setitemnewdata,
        }}
      >
        {children}
      </userLogin.Provider>
    );
}

export default UserLoginProvider;