import Header from "layouts/Header";
import TopNavigation from "layouts/TopNavigation";
import Content from "layouts/Content";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { DataContext } from "contexts/DataContext";
import Footer from "layouts/Footer";
function RootLayout() {
  const { isLoading } = useContext(DataContext);
  return (
    <RootLayoutDefault id="root-layout">
      <div className="my-content">
        A simple version clone of Tftactics site --- Just for fun :)) ---
        Origin site here:{" "}
        <a href="https://tftactics.gg/" target="_blank" rel="noreferrer">
          https://tftactics.gg
        </a>
      </div>
      <Header />
      <TopNavigation />
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
      color: black;
    }
  }
`;
