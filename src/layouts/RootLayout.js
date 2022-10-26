import "./RootLayout.scss";
import Header from "../components/layouts/Header";
import HeaderNavigation from "../components/layouts/HeaderNavigation";
import Content from "../components/layouts/Content";
import { Outlet, Link, useLoaderData, Form, } from "react-router-dom";

function RootLayout() {
  return (
    <div id="root-layout">
      <Header />
      <HeaderNavigation />
      <Content>
        <Outlet />
      </Content>
      <div className="footer"></div>
    </div>
  );
}

export default RootLayout;
