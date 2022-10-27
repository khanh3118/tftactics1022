import styled from "styled-components";

function ContentLayout(props) {
  return (
    <div id="content-layout-default">
      <Wrapper>
        <Navigation>
          <Title>{props.nameContent}</Title>
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

export default ContentLayout;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 27.8% auto;
  grid-template-rows: auto;
  padding-bottom: 30px;
`;

const Navigation = styled.div`
  border-right: 1px solid #17313a;
  padding-right: 30px;
`;

const Title = styled.div`
  min-height: 35px;
  padding-bottom: 20px;
  border-bottom: 1px solid #17313a;
  span {
    display: block;
    min-height: 32px;
    font-size: 21px;
    font-weight: 600;
  }
`;
