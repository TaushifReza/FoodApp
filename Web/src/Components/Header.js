import React from 'react';
import { Link } from 'react-router-dom';
let logo = require("../images/icon.png");

function Header() {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
    <Link className="nav-link" aria-current="page" to="/dashboard">
    <img src={logo} style={{ height: "45px" }} className="m-1" />
    </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/dashboard">Home</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Seller Panel
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="/dashboard">MenuItems</a></li>
              <li><a className="dropdown-item" href="#">All Orders</a></li>
            </ul>
          </li>
          <div className="d-flex" style={{ marginLeft: "auto" }}>
          <>
          <li className="nav-item">
                      <button
                        className="nav-link active"
                        style={{
                          cursor: "pointer",
                          background: "transparent",
                          border: 0,
                        }}
                      >
                        Welcome, Aryan Dhamala
                      </button>
                    </li>
          <li className="nav-item">
                      <button
                        className="btn btn-warning btn-outlined rounded-pill text-white mx-2"
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}>
                        Logout
                      </button>
                    </li>
                    </>
          </div>
        </ul>
      </div>
    </div>
  </nav></div>
  )
}

export default Header