import { useContext } from "react";
import "./ComponentCSS/Admin.css";
import userLogin from "../context/UserLogin";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";

function Admin() {
  const { loggedin, setloggedin,Userdata } = useContext(userLogin);
  const navigate = useNavigate();
  

  function logout() {
    setloggedin(false);
    navigate("/");
  }
  return (
    <>
      {!loggedin && <Navigate to={"/"} />}
      <h1>Admin</h1>
      <br/>
      <h2>{Userdata.id}</h2>
      <h2>{Userdata.fullName}</h2>
      <h2>{Userdata.phoneNumber}</h2>
      <h2>{Userdata.address}</h2>
      <h2>{Userdata.userName}</h2>
      <Button
        variant="contained"
        sx={{ width: 120, height: 50 }}
        onClick={logout}
      >
        Logout
      </Button>
    </>
  );
}

export default Admin;
