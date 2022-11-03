import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/Root";
import DatabaseLayout from "./views/Database/DatabaseLayout";
import ItemBuilder from "./views/ItemBuilder/ItemBuilder";
import Champions from "./views/Database/Contents/Champions";
import ChampionsStats from "./views/Database/Contents/ChampionsStats";
import Origins from "./views/Database/Contents/Origins";
import Classes from "./views/Database/Contents/Classes";
import "./firebase/main";
import ChampionsManager, {
  loader as ChampionsManagerLoader,
} from "views/Manager/ChampionsManager";
import ItemsManager from "views/Manager/ItemsManager";
import SynergysManager from "views/Manager/SynergysManager";
import SignUp from "components/auth/SignUp";
import { AuthProvider } from "contexts/AuthContext";
import PrivateRoute from "components/auth/PrivateRoute";
import { DataProvider } from "contexts/DataContext";
import TeamComps from "views/TeamComps/TeamComps";
import TeamCompsManager from "views/Manager/TeamCompsManager";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignUp />,
  },
  {
    path: "/manager/origins",
    element: (
      <PrivateRoute>
        <SynergysManager />
      </PrivateRoute>
    ),
    loader: ChampionsManagerLoader,
  },
  {
    path: "/manager/teamcomps",
    element: (
      <PrivateRoute>
        <TeamCompsManager />
      </PrivateRoute>
    ),
    loader: ChampionsManagerLoader,
  },
  {
    path: "/manager/items",
    element: (
      <PrivateRoute>
        <ItemsManager />
      </PrivateRoute>
    ),
    loader: ChampionsManagerLoader,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "database",
        element: <DatabaseLayout />,
        children: [
          {
            name: "champion",
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
      {
        path: "teamcomps",
        element: <TeamComps />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
