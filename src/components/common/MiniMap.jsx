import styled from "styled-components";
import HexagonMinimap from "components/common/HexagonMinimap";

export default function MiniMap(props) {
  const positionAmount = 28;
  function getChampionName(position) {
    return props.members.find((m) => Number(m.position) === position)?.name;
  }
  function createElements(n) {
    var elements = [];
    for (let i = 0; i < n; i++) {
      elements.push(
        <HexagonMinimap
          key={i}
          champion_name={getChampionName(i + 1)}
          className={i + 1 === 8 || i + 1 === 22 ? "wrap" : ""}
          width="40px"
          height="40px"
        />
      );
    }
    return elements;
  }
  return <MiniMapWrapper>{createElements(positionAmount)}</MiniMapWrapper>;
}

const MiniMapWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 300px;
  .wrap {
    margin-left: 18px;
  }
`;
