import { useContext } from "react";
import "./ComponentCSS/Admin.css";
import userLogin from "../context/UserLogin";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";

function Admin() {
  const { loggedin, setloggedin } = useContext(userLogin);
  const navigate = useNavigate();

  function logout() {
    setloggedin(false);
    navigate("/");
  }
  return (
    <>
      {!loggedin && <Navigate to={"/"} />}
      <h1>Admin</h1>
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
