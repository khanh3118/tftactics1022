import styled from "styled-components";
import SynergyIcon from "./SynergyIcon";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { DataContext } from "contexts/DataContext";
import LoadingCycle from "components/common/LoadingCycle";
import { useEffect } from "react";

function AvatarChampion(props) {
  const [hiddenPopup, setHiddenPopup] = useState(true);
  const [loadDone, setLoadDone] = useState(false);
  const { championsData, synergysData, itemsData } = useContext(DataContext);
  const [championDetail, setChampionDetail] = useState(
    championsData.find((item) => item.champion_name === props.champion_name)
  );
  const [synergys, setSynergys] = useState(
    synergysData.filter((item) => {
      return championDetail.champion_origin
        .concat(championDetail.champion_class)
        .includes(item.synergy_name.toLowerCase());
    })
  )
  const [itemsRecommend, setItemsRecommend] = useState(
    itemsData.filter((item) =>
      championDetail.champion_items.includes(item.item_name)
    )
  );
  let borders = {
    1: "#213042",
    2: "#156831",
    3: "#12407c",
    4: "#893088",
    5: "#b89d27",
    6: "#12407c",
    7: "#fff",
    8: "#fff",
  };
  let borders_image = {
    6: "linear-gradient(to bottom right,#12407c 0,#fff 25%,#12407c 50%,#fff 75%,#12407c);",
    7: "linear-gradient(to bottom right,#893088 0,#fff 25%,#893088 50%,#fff 75%,#893088);",
    8: "linear-gradient(to bottom right,#b89d27 0,#fff 25%,#b89d27 50%,#fff 75%,#b89d27);",
  };
  return (
    <AvatarChampionDefault
      loadDone={loadDone}
      border_color={borders[championDetail.champion_cost]}
      border_image={borders_image[championDetail.champion_cost]}
      className={props.className}
      width={props.width}
      height={props.height}
      onMouseEnter={() => setHiddenPopup(false)}
    >
      <div className="wrapper">
        <img
          className="avatar-champion"
          src={championDetail.champion_img_link}
          alt={championDetail.champion_name}
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
                      <SynergyIcon
                        className="popup-synergy-item"
                        key={item.synergy_name}
                        img_src={item.synergy_image}
                        name={item.synergy_name}
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
    </AvatarChampionDefault>
  );
}

export default AvatarChampion;

const AvatarChampionDefault = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
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
      width: 100%;
      height: auto;
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
  }
`;
