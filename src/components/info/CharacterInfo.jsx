import styled from "styled-components";
import SynergyInfo from "./SynergyInfo";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState, memo } from "react";
import { DataContext } from "contexts/DataContext";
import LoadingCycle from "components/common/LoadingCycle";
import ItemInfo from "components/info/ItemInfo";
import { CHARACTER_BORDERS, BORDER_IMAGES } from "config/color";
import { useNavigate } from "react-router-dom";
import { clearSelected } from "utils/helper";

const CharacterInfo = memo((props) => {
  const [hiddenPopup, setHiddenPopup] = useState(true);
  const [loadDone, setLoadDone] = useState(false);
  const { championsData, synergysData, itemsData } = useContext(DataContext);
  const navigate = useNavigate();

  const championDetail = championsData.find(
    (item) => item.champion_name === props.champion_name
  );

  const synergys = synergysData.filter((item) => {
    return championDetail.champion_origin
      .concat(championDetail.champion_class)
      .includes(item.synergy_name.toLowerCase());
  });

  const itemsRecommend = itemsData.filter((item) =>
    championDetail.champion_items.includes(item.item_name)
  );
  function hanleClickItemEquip(e, itemName) {
    e.stopPropagation();
    navigate("/itembuilder", { state: { item_name: itemName } });
  }
  function hanleOnDragStart(e) {
    clearSelected();
    e.dataTransfer.setData("champion_name", championDetail.champion_name);
  }
  function hanleClickCharacterImg(e, championName) {
    if (!props.disableRedirect) {
      e.stopPropagation();
      let name = championName.toLowerCase().split(" ").join("_");
      navigate(`/champions/${name}`, {
        state: { champion_name: championName },
      });
    }
  }
  return (
    championDetail && (
      <CharacterInfoDefault
        loadDone={loadDone}
        border_color={CHARACTER_BORDERS[championDetail.champion_cost]}
        border_image={BORDER_IMAGES[championDetail.champion_cost]}
        className={props.className}
        width={props.width}
        height={props.height}
        onMouseEnter={() => setHiddenPopup(false)}
        rightPopup={props.rightPopup}
        max_level={props.max_level}
      >
        {props.items_equip !== undefined && props.items_equip.length > 0 && (
          <div className="item">
            {props.items_equip.map((itemName) => {
              return (
                <ItemInfo
                  hanleClick={(e) => hanleClickItemEquip(e, itemName)}
                  className="item-avatar"
                  key={itemName}
                  width="18px"
                  height="18px"
                  item_name={itemName}
                />
              );
            })}
          </div>
        )}
        <div className="wrapper">
          <img
            className="avatar-champion"
            src={championDetail.champion_img_link}
            alt={championDetail.champion_name}
            draggable={true}
            onDragStart={(e) => hanleOnDragStart(e)}
            onClick={(e) =>
              hanleClickCharacterImg(e, championDetail.champion_name)
            }
          />
          {hiddenPopup || (
            <div className="popup">
              <div className="popup-info">
                <div className="popup-avatar">
                  <img src={championDetail.champion_img_link} alt="" />
                  <span>{championDetail.champion_name}</span>
                </div>
                <div className="popup-synergy">
                  {synergys &&
                    synergys.map((item) => {
                      return (
                        <SynergyInfo
                          width="20px"
                          height="20px"
                          className="popup-synergy-item"
                          key={item.synergy_name}
                          synergy_name={item.synergy_name}
                          hidePopUpOnHover={true}
                        />
                      );
                    })}
                </div>
                <div className="popup-cost">
                  <FontAwesomeIcon className="coin" icon={solid("coins")} />
                  <span>{championDetail.champion_cost}</span>
                </div>
              </div>
              <div className="loading">
                <LoadingCycle />
              </div>
              <div className="popup-items">
                <span>
                  Items:{" "}
                  {itemsRecommend.map((item, index) => {
                    return (
                      <span key={item.item_name}>
                        <img
                          src={item.item_image}
                          alt=""
                          onLoad={() => {
                            if (index === itemsRecommend.length - 1) {
                              setLoadDone(true);
                            }
                          }}
                        />
                      </span>
                    );
                  })}
                </span>
              </div>
            </div>
          )}
        </div>
      </CharacterInfoDefault>
    )
  );
});

export default CharacterInfo;

const CharacterInfoDefault = styled.div`
  position: relative;
  ${(props) =>
    props.max_level &&
    `
    &::before {
    content: "★★★";
    color: #e4c157;
    position: absolute;
    top: -12px;
    left: 50%;
    font-size: 14px;
    transform: translateX(-50%);
    z-index: 10;
    width: 100%;
    text-align: center;
    text-shadow: 0 3px 3px #000;
    letter-spacing: -3px;
    margin-left: -1px;
  }
  `}
  .item {
    position: absolute;
    display: flex;
    left: 50%;
    transform: translateX(-50%) translateY(25%);
    bottom: 0;
    z-index: 100;
    .item-avatar {
    }
  }
  .wrapper {
    position: relative;
    width: 100%;
    .loading {
      display: ${(props) => (props.loadDone === true ? "none" : "block")};
      padding: 20px;
      border: 1px solid #17313a;
    }
    .avatar-champion {
      cursor: pointer;
      transition: border-color 0.2s;
      width: ${(props) => props.width} !important;
      height: ${(props) => props.height} !important;
      border: 1px solid;
      border-color: ${(props) => props.border_color};
      border-image: ${(props) => props.border_image};
      border-image-slice: ${(props) => (props.border_image ? "1" : "")};
    }
    &:hover {
      .avatar-champion {
        border-color: #d47559;
      }
      .popup {
        display: block;
      }
    }
    .popup {
      z-index: 1000;
      display: none;
      position: absolute;
      ${(props) =>
        props.rightPopup
          ? `
        left: 100%;
        top: 50%;
        transform: translateY(-50%) translateX(18px);
      `
          : `
        bottom: calc(100% + 6px);
        transform: translateX(-50%)
        translateX(${Number(props.width.split("px")[0]) / 2 + "px"});
      `}
      background-color: #102531;
      border: 1px solid #17313a;
      .popup-info {
        display: ${(props) => (props.loadDone === true ? "flex" : "none")};
        .popup-avatar {
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-right: 1px solid #17313a;
          justify-content: center;
          span {
            display: flex;
            width: max-content;
            color: white !important;
          }
          img {
            width: 50px;
            height: 50px;
          }
        }
        .popup-synergy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .popup-synergy-item {
            padding: 5px 13px;
            span {
              color: white !important;
            }
          }
        }
        .popup-cost {
          background-color: #0d202b;
          display: flex;
          align-items: center;
          border-left: 1px solid #17313a;
          padding: 0 9px;
          span {
            margin-left: 5px !important;
          }
        }
      }
      .popup-items {
        display: ${(props) => (props.loadDone === true ? "block" : "none")};
        background-color: #0d202b;
        border-top: 1px solid #17313a;
        padding: 10px;
        img {
          border: 1px solid #17313a;
          width: 25px;
          height: 25px;
          margin-left: 5px;
          &:nth-child(1) {
            margin-left: 10px !important;
          }
        }
      }
    }
  }
`;
