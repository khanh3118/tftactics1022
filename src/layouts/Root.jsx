import Header from "layouts/Header";
import TopNavigation from "layouts/TopNavigation";
import Content from "layouts/Content";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "contexts/DataContext";
import Footer from "layouts/Footer";
import { useNavigate } from "react-router-dom";

function RootLayout() {
  const [isOpenNaviagtion, setIsOpenNaviagtion] = useState(false);
  const { isLoading } = useContext(DataContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === "/") navigate("/teamcomps");
  }, []);
  return (
    <RootLayoutDefault id="root-layout">
      <div className="my-content">
        A simple version clone of Tftactics site use ReactJs :)) --- Origin site
        here:{" "}
        <a href="https://tftactics.gg/" target="_blank" rel="noreferrer">
          https://tftactics.gg
        </a>
      </div>
      <Header hanleClickNavigationBtn={() => setIsOpenNaviagtion((pre) => !pre)} />
      <TopNavigation
        isOpenNaviagtion={isOpenNaviagtion}
        hanleClickLink={() => setIsOpenNaviagtion(false)}
      />
      <Content>{isLoading || <Outlet />}</Content>
      <Footer />
    </RootLayoutDefault>
  );
}

export default RootLayout;

const RootLayoutDefault = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0;
  color: white;
  .my-content {
    background-color: #d47559;
    text-align: center;
    padding: 3px 0;
    a {
      text-decoration: none;
      color: #12407c;
    }
  }
`;
