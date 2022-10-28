import styled from "styled-components";

function AvatarChampion(props) {
  let borders = {
    1: "#213042",
    2: "#156831",
    3: "#12407c",
    4: "#893088",
    5: "#b89d27",
  };
  return (
    <AvatarChampionDefault
      border_color={borders[props.cost]}
      className={props.className}
      width={props.width}
      height={props.height}
    >
      <div className="wrapper">
        <img src={props.img_src} alt={props.img_alt} />
      </div>
    </AvatarChampionDefault>
  );
}

export default AvatarChampion;

const AvatarChampionDefault = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  .wrapper {
    width: 100%;
    img {
      width: 100%;
      height: auto;
      border: 1px solid;
      border-color: ${(props) => props.border_color};
    }
  }
`;
