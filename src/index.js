import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/Root";
import Database, { loader as databaseLoader } from "./views/Database/Database";
import ItemBuilder from "./views/ItemBuilder";
import Champions from "./views/Database/Contents/Champions";
import ChampionsStats from "./views/Database/Contents/ChampionsStats";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "database",
        element: <Database />,
        loader: databaseLoader,
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
            element: <div>origins</div>,
          },
          {
            path: "classes",
            element: <div>classes</div>,
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
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
