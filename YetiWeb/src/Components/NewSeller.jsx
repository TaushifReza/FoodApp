import { useContext, useState } from "react";
import userLogin from "../context/UserLogin";
import { Navigate,useLocation,useNavigate } from "react-router-dom";


function NewSeller() {
  const { loggedin, LoginToken, setUserProfiledata } =
    useContext(userLogin);
  
  const [RestaurantName, setRestaurantName] = useState();
  const [RestaurantAddress, setRestaurantAddress] = useState();
  const { state } = useLocation();
  const navigate = useNavigate()
   
  function Sellernavigation() {
   
    if (state.role == "Individual Seller") {

      navigate("/Individual");
    }
    
    if (state.role == "Restaurants Seller") {
       navigate ("/Restaurant");
    }
  }

  async function sellerInfo() {
    const data = {
      name: RestaurantName.trim().toLocaleLowerCase(),
      address: RestaurantAddress.trim().toLocaleLowerCase(),
      
    };
    const Requestoptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
         "Authorization": "Bearer " + LoginToken,
      },
      body: JSON.stringify(data),
    };
    const Fetch = await fetch(
      "https://localhost:7041/api/SellerProfile",
      Requestoptions
    );
    const jasonData = await Fetch.json();
    if(jasonData.isSuccess==true){
      
      setUserProfiledata(jasonData.result)
        Sellernavigation();
    }
  }

  return (
    <>
      {!loggedin && <Navigate to={"/"} />}
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center min-vh-100">
                <div className="w-100 d-block bg-white shadow-lg rounded my-5">
                  <div className="row">
                    <div className="col-lg-5 d-none d-lg-block bg-login rounded-left bg-black "></div>
                    <div className="col-lg-7">
                      <div className="p-5">
                        <div className="text-center mb-5">
                          <h1>YetiEats Patner</h1>
                        </div>
                        <h1 className="h5 mb-1">Get Started!</h1>
                        <p className="text-muted mb-4">
                          Enter your Restaurant name and address to continue.
                        </p>
                        <form className="user">
                          <div className="form-group mb-4">
                            <input
                              type="text"
                              className="form-control form-control-user"
                              placeholder="Restaurant/Kitchen Name*"
                              onChange={(e) =>
                                setRestaurantName(e.target.value)
                              }
                            />
                          </div>
                          <div className="form-group mb-4">
                            <input
                              type="text"
                              className="form-control form-control-user"
                              placeholder="Restaurant/Pickup Location*"
                              onChange={(e) =>
                                setRestaurantAddress(e.target.value)
                              }
                            />
                          </div>
                          <input
                            type="button"
                            className="btn btn-success btn-block waves-effect waves-light w-100"
                            value="Continue"
                            onClick={sellerInfo}
                          ></input>
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

export default NewSeller;
