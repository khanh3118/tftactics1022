import Header from "components/layouts/Header";
import HeaderNavigation from "components/layouts/HeaderNavigation";
import Content from "components/layouts/Content";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

function RootLayout() {
  return (
    <RootLayoutDefault id="root-layout">
      <Header />
      <HeaderNavigation />
      <Content>
        <Outlet />
      </Content>
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
