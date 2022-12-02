import styled from "styled-components";

function Content(props) {
  return (
    <ContentDefault id="content-default">
      <Wrapper className="wrapper">
        <a className="version-update" href="/">
          <div className="update-title">
            Set 7.5 Update is now live on TFTactics!
          </div>
          <div className="update-subtitle">Click here to learn more</div>
        </a>
        {props.children}
      </Wrapper>
    </ContentDefault>
  );
}

export default Content;

const ContentDefault = styled.div`
  min-height: 100vh;
  padding-top: 45px;
  background-color: #0d202b;
  @media (max-width: 1024px) {
    padding-left: 45px;
    padding-right: 45px;
  }
`;

const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  .version-update {
    position: relative;
    font-size: 21px;
    background: #102531;
    background-image: url(https://rerollcdn.com/update/set-7-5-update-bg.png);
    background-position: center 600px;
    background-size: cover;
    border: 1px solid #17313a;
    width: 100%;
    height: 100px;
    color: hsla(0, 0%, 100%, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    filter: saturate(1);
    cursor: pointer;
    transition: all 0.3s;
    margin: 0 auto 30px;
    text-decoration: none;
    &:hover {
      border-color: #227aad;
    }
    .update-title {
      font-weight: 600;
      font-size: 21px;
      margin-bottom: 7px;
    }
    .update-subtitle {
      font-size: 16px;
      color: #579dd4;
      font-weight: 400;
    }
  }
`;
