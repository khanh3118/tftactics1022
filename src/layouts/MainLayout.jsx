import styled from "styled-components";

function MainLayout(props) {
  return (
    <div id="content-layout-default">
      <Wrapper>
        <Navigation>
          {props.nameContent}
          {props.sideContent}
        </Navigation>
        <div className="content">
          {props.titleContent}
          {props.mainContent}
        </div>
      </Wrapper>
    </div>
  );
}

export default MainLayout;

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 27.8% auto;
  grid-template-rows: auto;
  padding-bottom: 30px;
`;

const Navigation = styled.div`
  border-right: 1px solid #17313a;
  padding-right: 30px;
`;
