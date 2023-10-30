import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";

import Profile from "./pages/profile";
import Store, { storeLoader } from "./pages/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Profile />,
  },
  {
    path: "/store",
    element: <Store />,
    loader: storeLoader,
  },
  {
    path: "/*",
    element: <Navigate to="/" replace="true" />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
