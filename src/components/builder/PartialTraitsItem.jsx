import styled from "styled-components";
import SynergyIcon from "components/common/SynergyIcon";

const BONUS_LEVEL_COLOR = {
  1: "#a0715e",
  2: "#7c8f92",
  3: "#bd9a38",
  4: "#ad1457",
  5: "#ad1457",
};

export default function PartialTraitsItem({
  width,
  height,
  count,
  hide_name,
  synergy_name,
  bonus_level,
}) {
  return (
    <PartialTraitsItemWrapper>
      <SynergyIconWrapper bonus_level_color={BONUS_LEVEL_COLOR[bonus_level]}>
        <SynergyIcon
          width={width}
          height={height}
          count={count}
          hide_name={hide_name}
          synergy_name={synergy_name}
          bonus_level={bonus_level}
        />
      </SynergyIconWrapper>
      <div className="trait-info">
        <div className="trait-info-name"></div>
        <div className="trait-info-level"></div>
      </div>
    </PartialTraitsItemWrapper>
  );
}

const PartialTraitsItemWrapper = styled.div``;

const SynergyIconWrapper = styled.div`
  margin-right: 5px;
  margin-bottom: 10px;
  height: min-content;
  display: flex;
  width: max-content;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bonus_level_color};
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  padding: 0 5px 0 4px;
  position: relative;
  margin-bottom: 25px;
  &::before {
    content: "";
    position: absolute;
    width: 0;
    left: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    z-index: 1;
    bottom: 100%;
    border-bottom: 6.93px solid ${(props) => props.bonus_level_color};
  }
  &::after {
    content: "";
    position: absolute;
    width: 0;
    left: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    z-index: 1;
    top: 100%;
    border-top: 6.93px solid ${(props) => props.bonus_level_color};
  }
`;
