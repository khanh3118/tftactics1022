import styled from "styled-components";
import SynergyInfo from "../info/SynergyInfo";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { DataContext } from "contexts/DataContext";
import LoadingCycle from "components/common/LoadingCycle";
import ItemInfo from "components/info/ItemInfo";
import { CHARACTER_BORDERS, BORDER_IMAGES } from "config/color";
import { useNavigate } from "react-router-dom";

function HexagonMinimap(props) {
  const navigate = useNavigate();
  const [hiddenPopup, setHiddenPopup] = useState(true);
  const [loadDone, setLoadDone] = useState(false);
  const { championsData, synergysData, itemsData } = useContext(DataContext);
  let championDetail = {};
  let synergys = [];
  let itemsRecommend = [];
  if (props.champion_name) {
    championDetail = championsData.find(
      (item) => item.champion_name === props.champion_name
    );
    synergys = synergysData.filter((item) => {
      return championDetail.champion_origin
        .concat(championDetail.champion_class)
        .includes(item.synergy_name.toLowerCase());
    });
    itemsRecommend = itemsData.filter((item) =>
      championDetail.champion_items.includes(item.item_name)
    );
  }

  function hanleClickChampionImg(e, championName) {
    e.stopPropagation();
    let name = championName.toLowerCase().split(" ").join("_");
    navigate(`/champions/${name}`, {
      state: { champion_name: championName },
    });
  }

  return (
    championDetail && (
      <HexagonMinimapDefault
        loadDone={loadDone}
        border_color={CHARACTER_BORDERS[championDetail.champion_cost]}
        border_image={BORDER_IMAGES[championDetail.champion_cost]}
        className={props.className}
        width={props.width}
        height={props.height}
        onMouseEnter={() => setHiddenPopup(false)}
      >
        {props.items_equip !== undefined && props.items_equip.length > 0 && (
          <div className="item">
            {props.items_equip.map((itemName) => {
              return (
                <ItemInfo
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
          <div className="hex">
            <div className="hexIn">
              <div className="hexLink">
                {props.champion_name !== undefined && (
                  <img
                    onClick={(e) =>
                      hanleClickChampionImg(e, props.champion_name)
                    }
                    className="avatar-champion"
                    src={championDetail.champion_img_link}
                    alt={championDetail.champion_name}
                  />
                )}
              </div>
            </div>
          </div>
          {hiddenPopup || props.champion_name === undefined || (
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
      </HexagonMinimapDefault>
    )
  );
}

export default HexagonMinimap;

const HexagonMinimapDefault = styled.div`
  position: relative;
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
      transition: all 0.2s;
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
      bottom: calc(100% + 6px);
      transform: translateX(-50%)
        translateX(${(props) => Number(props.width.split("px")[0]) / 2 + "px"});
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
    .hex {
      width: 36px !important;
      height: 32px !important;
      position: relative;
      outline: 1px solid transparent;
      width: 12%;
      margin: 0;
      .hexIn {
        width: 32.39px;
        height: 37.41px;
        position: absolute;
        margin: 0 2%;
        overflow: hidden;
        visibility: hidden;
        outline: 1px solid transparent;
        transform: rotate(-60deg) skewY(30deg);
        .hexLink {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          text-align: center;
          color: #fff;
          background: #123040;
          overflow: hidden;
          position: absolute;
          visibility: visible;
          outline: 1px solid transparent;
          transform: skewY(-30deg) rotate(60deg);
          .hexImg {
            img {
              border: none;
            }
          }
        }
      }
    }
  }
`;
