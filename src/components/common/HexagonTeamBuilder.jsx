import styled from "styled-components";
import { Fragment, useContext } from "react";
import { DataContext } from "contexts/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { HEXAGON_BUILDER_BORDER_COLORS } from "config/color";
import { clearSelected } from "utils/helper";

export default function Hexagon({
  className,
  data,
  hanle_change_level,
  hanle_on_drop,
  position,
}) {
  const { championsData, itemsData } = useContext(DataContext);
  const [levelVisible, setLevelsVisible] = useState(false);

  function getItemImage(item_name) {
    return itemsData.find((i) => i.item_name === item_name)?.item_image;
  }
  function addActive(is_max_level) {
    if (is_max_level) return "active";
    return "";
  }
  function onDragStartItem(e, item_index) {
    clearSelected();
    e.stopPropagation();
    e.dataTransfer.setData("drag_item_index", item_index);
    e.dataTransfer.setData("drag_item_position", position);
  }
  function onDragStartCharacter(e) {
    clearSelected();
    if (data.cost) e.dataTransfer.setData("drag_from_position", position);
  }
  return (
    <HexagonWrapper
      draggable={data.cost && true}
      backgroud_image={
        championsData.find((c) => c.champion_name === data.name)
          ?.champion_img_link
      }
      border_color={HEXAGON_BUILDER_BORDER_COLORS[data?.cost]}
      className={className}
      onMouseOver={() => setLevelsVisible(true)}
      onMouseOut={() => setLevelsVisible(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => hanle_on_drop(e, position, data.cost ? false : true)}
      onDragStart={(e) => onDragStartCharacter(e)}
    >
      <div className="character-items">
        {data.items !== undefined &&
          data.items.map((item, index) => {
            return (
              <img
                key={item}
                className="character-item"
                src={getItemImage(item)}
                draggable={true}
                alt="hehe"
                onDragStart={(e) => onDragStartItem(e, index)}
              />
            );
          })}
      </div>
      {data?.max_level !== undefined && (
        <div
          onClick={() => hanle_change_level(data.position, data.max_level)}
          className="character-levels"
        >
          {(levelVisible || data.max_level) && (
            <Fragment>
              <FontAwesomeIcon
                className={addActive(data.max_level)}
                size="sm"
                icon={solid("star")}
              />
              <FontAwesomeIcon
                className={addActive(data.max_level)}
                size="sm"
                icon={solid("star")}
              />
              <FontAwesomeIcon
                className={addActive(data.max_level)}
                size="sm"
                icon={solid("star")}
              />
            </Fragment>
          )}
        </div>
      )}
      <div className="hexTop"></div>
      <div className="hexBottom"></div>
    </HexagonWrapper>
  );
}

const HexagonWrapper = styled.div`
  display: inline-block;
  text-align: left;
  position: relative;
  width: 72px;
  height: 42px;
  margin: 20px 5px;
  background-color: #102531;
  background-size: auto 80px;
  background-position: 50%;
  border-left: 3px solid #17313a;
  border-right: 3px solid #17313a;
  background-image: url(${({ backgroud_image }) => backgroud_image});
  border-right-color: ${({ border_color }) => border_color};
  border-left-color: ${({ border_color }) => border_color};
  cursor: pointer;
  .hexTop,
  .hexBottom {
    position: absolute;
    z-index: 1;
    overflow: hidden;
    transform: scaleY(0.5774) rotate(-45deg);
    background: inherit;
    width: 50px;
    height: 50px;
    left: 8px;
    &::after {
      content: "";
      position: absolute;
      transform-origin: 0 0;
      background: inherit;
      width: 64.5px;
      height: 41px;
      transform: rotate(45deg) scaleY(1.7) translateY(-20.5px);
    }
  }
  .hexTop {
    top: -25px;
    border-top: 4px solid #17313a;
    border-right: 4px solid #17313a;
    border-top-color: ${({ border_color }) => border_color};
    border-right-color: ${({ border_color }) => border_color};
    &::after {
      background-position: top;
    }
  }
  .hexBottom {
    bottom: -25px;
    border-bottom: 4px solid #17313a;
    border-left: 4px solid #17313a;
    border-bottom-color: ${({ border_color }) => border_color};
    border-left-color: ${({ border_color }) => border_color};
    &::after {
      content: "";
      display: block;
      padding-bottom: 90%;
      background-position: bottom;
    }
  }
  .character-items,
  .character-levels {
    position: absolute;
    display: flex;
    z-index: 999;
    left: 50%;
    transform: translateX(-50%);
  }
  .character-items {
    bottom: -20px;
    justify-content: center;
    .character-item {
      width: 22px;
      height: 22px;
    }
  }
  .character-levels {
    top: -15px;
    .active {
      color: orange;
    }
  }
`;
