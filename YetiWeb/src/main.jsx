import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Admin from "./Components/Admin";
import Restaurant from "./Components/Restaurant";
import Individual from "./Components/Individual";
import UserLoginProvider from "./context/userLoginProvider.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import NewSeller from "./Components/NewSeller.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Admin",
    element: <Admin />,
  },
  {
    path: "/Restaurant",
    element: <Restaurant />,
  },
  {
    path: "/Individual",
    element: <Individual />,
  },
  {
    path: "/NewSeller",
    element: <NewSeller />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserLoginProvider>
      <RouterProvider router={router} />
    </UserLoginProvider>
  </React.StrictMode>
);
