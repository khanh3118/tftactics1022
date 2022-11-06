import Header from "layouts/Header";
import TopNavigation from "layouts/TopNavigation";
import Content from "layouts/Content";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { DataContext } from "contexts/DataContext";
function RootLayout() {
  const { isLoading } = useContext(DataContext);
  return (
    <RootLayoutDefault id="root-layout">
      <Header />
      <TopNavigation />
      <Content>{isLoading || <Outlet />}</Content>
      <div className="footer"></div>
    </RootLayoutDefault>
  );
}

export default RootLayout;

const RootLayoutDefault = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0;
  color: white;
`;
