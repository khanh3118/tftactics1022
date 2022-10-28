import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/Root";
import Database from "./views/Database/Database";
import ItemBuilder from "./views/ItemBuilder";
import Champions from "./views/Database/Contents/Champions";
import ChampionsStats from "./views/Database/Contents/ChampionsStats";
import Origins from "./views/Database/Contents/Origins";
import Classes from "./views/Database/Contents/Classes";
import Login from "./views/Manager/Login";
import "./firebase/main";
import SynergysManager from "./views/Manager/SynergysManager";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "manager/origins",
    element: <SynergysManager />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "database",
        element: <Database />,
        children: [
          {
            path: "champions",
            element: <Champions />,
          },
          {
            path: "championstats",
            element: <ChampionsStats />,
          },
          {
            path: "origins",
            element: <Origins />,
          },
          {
            path: "classes",
            element: <Classes />,
          },
          {
            path: "rolling",
            element: <div>rolling</div>,
          },
          {
            path: "augments",
            element: <div>augments</div>,
          },
        ],
      },
      {
        path: "itembuilder",
        element: <ItemBuilder />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
