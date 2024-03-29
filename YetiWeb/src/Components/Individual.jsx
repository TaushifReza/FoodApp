import "./ComponentCSS/Individual.css";
import { useContext } from "react";;
import userLogin from "../context/UserLogin";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";

function Individual() {

  const { loggedin, setloggedin, Userdata } = useContext(userLogin);
  const navigate = useNavigate();
  console.log(Userdata);

  function logout() {
    setloggedin(false);
    navigate("/");
  }
  return (
    <> 
    {!loggedin && <Navigate to={"/"} />}
      <h1>Individual</h1>
      <br />
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

export default Individual;
