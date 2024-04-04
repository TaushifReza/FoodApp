import "./ComponentCSS/Profile.css";
import { useContext, useEffect, useState } from "react";
import userLogin from "../context/UserLogin";

function Userprofile() {
  const { Userdata, LoginToken, UserProfiledata } = useContext(userLogin);
  const [edit, setedit] = useState(false);
  const [editRes, seteditRes] = useState(false);

  return (
    <>
      <div className="container">
        <div className="main-body mt-4">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Admin"
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4 style={{ textTransform: "capitalize" }}>
                        {Userdata.fullName}
                      </h4>
                      <p className="text-secondary mb-1"></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-globe mr-2 icon-inline"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                      Website
                    </h6>
                    <span className="text-secondary">
                      https://{UserProfiledata.name.split(" ").join("")}.com
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-twitter mr-2 icon-inline text-info"
                      >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                      Twitter
                    </h6>
                    <span className="text-secondary">
                      @{UserProfiledata.name.split(" ").join("")}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-instagram mr-2 icon-inline text-danger"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      Instagram
                    </h6>
                    <span className="text-secondary">
                      {" "}
                      @{UserProfiledata.name.split(" ").join("")}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-facebook mr-2 icon-inline text-primary"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                      Facebook
                    </h6>
                    <span className="text-secondary">
                      {" "}
                      @{UserProfiledata.name.split(" ").join("")}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              {!edit ? (
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Full Name</h6>
                      </div>
                      <div
                        className="col-sm-9 text-secondary"
                        style={{ textTransform: "capitalize" }}
                      >
                        {Userdata.fullName}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {Userdata.email}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Phone</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {Userdata.phoneNumber}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Address</h6>
                      </div>
                      <div
                        className="col-sm-9 text-secondary"
                        style={{ textTransform: "capitalize" }}
                      >
                        {Userdata.address}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-12">
                        <a
                          className="btn btn-info "
                          onClick={() => setedit(true)}
                        >
                          Edit
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Full Name</h6>
                      </div>
                      <div
                        className="col-sm-9 text-secondary"
                        style={{ textTransform: "capitalize" }}
                      >
                        <input
                          type="text"
                          class="form-control"
                          value={Userdata.fullName}
                        ></input>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="email"
                          class="form-control"
                          value={Userdata.email}
                        ></input>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Phone</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="number"
                          class="form-control"
                          value={Userdata.phoneNumber}
                        ></input>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Address</h6>
                      </div>
                      <div
                        className="col-sm-9 text-secondary"
                        style={{ textTransform: "capitalize" }}
                      >
                        <input
                          type="text"
                          class="form-control"
                          value={Userdata.address}
                        ></input>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-12">
                        <a
                          className="btn btn-info "
                          onClick={() => setedit(false)}
                        >
                          Save Changes
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!editRes ? (
                <div className="card mb-3">
                  <div className="card-body">
                    <h2 style={{ textAlign: "center", marginBottom: "1em" }}>
                      Kitchen/Restaurant
                    </h2>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Full Name</h6>
                      </div>
                      <div
                        className="col-sm-9 text-secondary"
                        style={{ textTransform: "capitalize" }}
                      >
                        {UserProfiledata.name}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Address</h6>
                      </div>
                      <div
                        className="col-sm-9 text-secondary"
                        style={{ textTransform: "capitalize" }}
                      >
                        {UserProfiledata.address}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-12">
                        <a
                          className="btn btn-info "
                          onClick={() => seteditRes(true)}
                        >
                          Edit
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card mb-3">
                  <div className="card-body">
                    <h2 style={{ textAlign: "center", marginBottom: "1em" }}>
                      Kitchen/Restaurant
                    </h2>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Full Name</h6>
                      </div>
                      <div
                        className="col-sm-9 text-secondary"
                        style={{ textTransform: "capitalize" }}
                      >
                        <input
                          type="text"
                          class="form-control"
                          value={UserProfiledata.name}
                        ></input>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Address</h6>
                      </div>
                      <div
                        className="col-sm-9 text-secondary"
                        style={{ textTransform: "capitalize" }}
                      >
                        <input
                          type="text"
                          class="form-control"
                          value={UserProfiledata.address}
                        ></input>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-12">
                        <a
                          className="btn btn-info"
                          onClick={() => seteditRes(false)}
                        >
                          Save Changes
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Userprofile;
