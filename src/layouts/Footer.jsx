import styled from "styled-components";

export default function Footer() {
  return (
    <FooterWrapper>
      <div className="container">
        TFTACTICS.GG isn’t endorsed by Riot Games and doesn’t reflect the views
        or opinions of Riot Games or anyone officially involved in producing or
        managing League of Legends. League of Legends and Riot Games are
        trademarks or registered trademarks of Riot Games, Inc. League of
        Legends © Riot Games, Inc.
        <p>© TFTactics 2021</p>
      </div>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: auto;
  font-size: 15px;
  padding: 30px 0;
  background: #102531;
  border-top: 1px solid #17313a;
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    p {
      margin-top: 10px;
      margin-bottom: 0;
      color: #88a0a7;
      font-size: 14px;
      text-align: center;
      max-width: none;
    }
  }
  @media (max-width: 1024px) {
    padding-left: 45px;
    padding-right: 45px;
  }
`;
