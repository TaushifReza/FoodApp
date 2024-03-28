import "./App.css";
import TextField from "@mui/material/TextField";
import Banner from "./Components/Banner";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userLogin from "./context/UserLogin";


function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertnull, setShowAlertnull] = useState(false);
 const { setloggedin }  = useContext(userLogin)

  function loginButton() {
    const data = {
      email: email.trim(),
      password: password.trim(),
    };
    if (data.email === "" || data.password === "") {
      setShowAlertnull(true);
      setShowAlert(false);
    } else if (data.email == "admin" && data.password == "admin") {
      setloggedin(true);
      navigate("/Admin");
    } else {
      setShowAlertnull(false);
      setShowAlert(true);
    }
  }

  return (
    <>
      <Banner />
      <div id="maincontainer">
        <div id="LoginContainer">
          <h1>Login</h1>
          {showAlertnull && (
            <Alert
              severity="info"
              sx={{ marginBottom: 3, marginTop: 1 }}
              onClose={() => setShowAlertnull(false)}
            >
              Please Enter Email and Password.
            </Alert>
          )}
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            sx={{ width: 500, margin: 1 }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            sx={{ width: 500, margin: 1 }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <Button
            variant="contained"
            sx={{ width: 120, height: 50 }}
            onClick={loginButton}
          >
            Login
          </Button>
          {showAlert && (
            <Alert
              severity="error"
              sx={{ marginBottom: 3, marginTop: -1 }}
              onClose={() => setShowAlert(false)}
            >
              Incorrect Email and Password.
            </Alert>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
