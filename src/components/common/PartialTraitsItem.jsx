import styled from "styled-components";
import SynergyInfo from "components/info/SynergyInfo";
import { BONUS_LEVEL_COLOR } from "config/color"

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
      <SynergyInfoWrapper bonus_level_color={BONUS_LEVEL_COLOR[bonus_level]}>
        <SynergyInfo
          width={width}
          height={height}
          count={count}
          hide_name={hide_name}
          synergy_name={synergy_name}
          bonus_level={bonus_level}
        />
      </SynergyInfoWrapper>
      <div className="trait-info">
        <div className="trait-info-name"></div>
        <div className="trait-info-level"></div>
      </div>
    </PartialTraitsItemWrapper>
  );
}

const PartialTraitsItemWrapper = styled.div``;

const SynergyInfoWrapper = styled.div`
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
