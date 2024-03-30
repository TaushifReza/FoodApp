import "./ComponentCSS/Nvigation.css";
import { useContext, useState } from "react";
import userLogin from "../context/UserLogin";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Order from "./Order";
import Userprofile from "./Userprofile";
import Food from "./Food";


function Navbar() {
  const { loggedin, setloggedin, Userdata } = useContext(userLogin);
  const [order, setOrder]=useState(false);
  const [menu, setMenu]=useState(false);
  const [profile, setProfile] = useState(false);
  const [btnToggle, SetbtnToggle] = useState(false);
  const navigate = useNavigate();
  let toggleClass = btnToggle ? "expand" : "";

  function logout() {
    setloggedin(false);
    navigate("/");
  }
  function SidebarButton() {
    SetbtnToggle((btnToggle) => !btnToggle);
  }

  return (
    <>
      {!loggedin && <Navigate to={"/"} />}
      <div className="wrapper">
        <aside
          id="sidebar"
          className={`${toggleClass}`}
          style={{ cursor: "pointer" }}
        >
          <div className="d-flex">
            <button
              className="toggle-btn"
              type="button"
              onClick={SidebarButton}
            >
              <i className="lni lni-grid-alt"></i>
            </button>
            <div className="sidebar-logo">
              <h3 className="text-white">YetiFoods</h3>
            </div>
          </div>
          <ul className="sidebar-nav ">
            <li className="sidebar-item">
              <Link
                onClick={() => {
                  setOrder(false);
                  setMenu(false);
                  setProfile(true);
                }}
                className="sidebar-link mb-3"
                style={{ textDecoration: "none" }}
              >
                <i className="lni lni-user"></i>
                <span> Profile</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                onClick={() => {
                  setOrder(true);
                  setMenu(false);
                  setProfile(false);
                }}
                className="sidebar-link mb-3"
                style={{ textDecoration: "none" }}
              >
                <i className="lni lni-agenda"></i>
                <span>Order</span>
              </Link>
            </li>

            <li className="sidebar-item">
              <Link
                onClick={() => {
                  setOrder(false);
                  setMenu(true);
                  setProfile(false);
                }}
                className="sidebar-link"
                style={{ textDecoration: "none" }}
              >
                <i className="lni lni-popup"></i>
                <span>Menu</span>
              </Link>
            </li>
          </ul>
          <div className="sidebar-footer">
            <Link
              onClick={logout}
              className="sidebar-link"
              style={{ textDecoration: "none" }}
            >
              <i className="lni lni-exit"></i>
              <span>Logout</span>
            </Link>
          </div>
        </aside>
        <div className="main p-3">
           {order && <Order></Order>}
           {profile && <Userprofile></Userprofile>}
           {menu && <Food></Food>}
        </div>
      </div>
    </>
  );
}
export default Navbar;
