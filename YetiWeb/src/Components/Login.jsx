import Alert from "@mui/material/Alert";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userLogin from "../context/UserLogin";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertnull, setShowAlertnull] = useState(false);
  const { setloggedin, setUserdata } = useContext(userLogin);

  function loginButtonValidation(email, password) {
    if (email === "" || password === "") {
      setShowAlertnull(true);
      setShowAlert(false);
    } else {
      setShowAlertnull(false);
      setShowAlert(true);
    }
  }

  async function loginButton() {
    const data = {
      email: email.trim().toLocaleLowerCase(),
      password: password.trim(),
    };
    const Requestoptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const Fetch = await fetch(
      "https://localhost:7041/api/User/login",
      Requestoptions
    );
    const jasonData = await Fetch.json();

    if (jasonData.role == "Admin") {
      navigate("/Admin");
      setloggedin(true);
      setUserdata(jasonData.user);
    } else if (jasonData.role == "Individual Seller") {
      setloggedin(true);
      setUserdata(jasonData.user);
      if (jasonData.userProfile == null) {
        navigate("/NewSeller", { state: { role: "Individual Seller" } });
      } else {
        navigate("/Individual");
      }
    } else if (jasonData.role == "Restaurants Seller") {
      setloggedin(true);
      setUserdata(jasonData.user);
      if (jasonData.userProfile == null) {
        navigate("/NewSeller", { state: { role: "Restaurants Seller" } });
      } else {
        navigate("/Restaurant");
      }
    } else {
      loginButtonValidation(data.email, data.password);
    }
  }

  return (
    <>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center min-vh-100">
                <div className="w-100 d-block bg-white shadow-lg rounded my-5">
                  <div className="row">
                    <div className="col-lg-5 d-none d-lg-block bg-login rounded-left bg-black ">
                      <h1> Photo</h1>
                    </div>
                    <div className="col-lg-7">
                      <div className="p-5">
                        <div className="text-center mb-5">
                          <h1>YetiEats</h1>
                        </div>
                        <h1 className="h5 mb-1">Welcome Back!</h1>
                        <p className="text-muted mb-4">
                          Enter your email address and password to access
                          dashboard.
                        </p>
                        <form className="user">
                          {showAlertnull && (
                            <Alert
                              severity="info"
                              sx={{ marginBottom: 3, marginTop: 1 }}
                              onClose={() => setShowAlertnull(false)}
                            >
                              Please Enter Email and Password.
                            </Alert>
                          )}
                          <div className="form-group mb-4">
                            <input
                              type="email"
                              className="form-control form-control-user"
                              id="exampleInputEmail"
                              placeholder="Email Address"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="form-group mb-4">
                            <input
                              type="password"
                              className="form-control form-control-user"
                              id="exampleInputPassword"
                              placeholder="Password"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          <input
                            type="button"
                            className="btn btn-success btn-block waves-effect waves-light w-100"
                            value="Log In"
                            onClick={loginButton}
                          ></input>

                          {showAlert && (
                            <Alert
                              severity="error"
                              sx={{ marginBottom: 3, marginTop: 1 }}
                              onClose={() => setShowAlert(false)}
                            >
                              Incorrect Email and Password.
                            </Alert>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
