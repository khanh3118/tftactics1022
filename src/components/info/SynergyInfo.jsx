import styled from "styled-components";
import { useContext, useState, memo } from "react";
import { DataContext } from "contexts/DataContext";
import LoadingCycle from "components/common/LoadingCycle";
import { CHARACTER_BORDERS, BORDER_IMAGES } from "config/color";

const SynergyInfo = memo((props) => {
  const { championsData, synergysData } = useContext(DataContext);
  const [loadDone, setLoadDone] = useState(false);
  const [hiddenPopup, setHiddenPopup] = useState(true);

  const synergyDetail = synergysData.find(
    (item) =>
      item.synergy_name.toLowerCase() === props.synergy_name.toLowerCase()
  );

  const championsList = championsData.filter(
    (item) =>
      item.champion_class.includes(synergyDetail.synergy_name.toLowerCase()) ||
      item.champion_origin.includes(synergyDetail.synergy_name.toLowerCase())
  );

  return (
    <SynergyInfoDefault
      width={props.width}
      height={props.height}
      loadDone={loadDone}
      className={props.className}
      onMouseEnter={() => setHiddenPopup(false)}
    >
      <div className="wrapper">
        <img
          className="wrapper-synergy-image"
          src={synergyDetail.synergy_image}
          alt={synergyDetail.synergy_name}
        />
        {props.hide_name || (
          <span className="synergy-name">{synergyDetail.synergy_name}</span>
        )}
        {props.count && <span className="synergy-count">{props.count}</span>}
        {hiddenPopup || props.hidePopUpOnHover || (
          <div className="popup">
            <div className="popup-info">
              <div className="popup-info-title">
                <div className="popup-info-title-wrapper">
                  <img src={synergyDetail.synergy_image} alt="" />
                  <span>{synergyDetail.synergy_name}</span>
                </div>
              </div>
              {synergyDetail.synergy_description !== " " && (
                <div className="popup-info-description">
                  {synergyDetail.synergy_description}
                </div>
              )}
              <div className="popup-info-description_level">
                <ul>
                  {synergyDetail.synergy_description_level
                    .split("/")
                    .map((item, index) => {
                      let a = item.split("$");
                      return (
                        <li key={index}>
                          <span
                            className={
                              index + 1 === props.bonus_level ||
                              (index === 0) &
                                (props.bonus_level === 3) &
                                (props.count === 1 || props.count === 3)
                                ? "active"
                                : ""
                            }
                          >
                            {a[0]}
                          </span>
                          {a[1]}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="loading">
              <LoadingCycle />
            </div>
            <div className="popup-champions">
              <span>Champions: </span>
              {championsList.map((item, index) => {
                return (
                  <div
                    key={item.champion_name}
                    className="champion-img-wrapper"
                  >
                    <ChampionImg
                      onLoad={() => {
                        if (index === championsList.length - 1) {
                          setLoadDone(true);
                        }
                      }}
                      border_color={CHARACTER_BORDERS[item.champion_cost]}
                      border_image={BORDER_IMAGES[item.champion_cost]}
                      src={item.champion_img_link}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </SynergyInfoDefault>
  );
});

export default SynergyInfo;

const SynergyInfoDefault = styled.div`
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: max-content !important;
    position: relative;
    .loading {
      display: ${(props) => (props.loadDone === true ? "none" : "block")};
      padding: 20px;
      border: 1px solid #17313a;
    }
    .wrapper-synergy-image {
      vertical-align: middle;
      height: ${(props) => props.width};
      width: ${(props) => props.height};
    }
    .synergy-name {
      margin-left: 10px !important;
      color: white;
    }
    .synergy-count {
      margin-left: 6px !important;
      color: white;
      font-size: 13px;
      transform: translateY(-2px);
      line-height: 100%;
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
      background-color: #102531;
      border: 1px solid #17313a;
      transform: translateX(-25%);
      .popup-info {
        min-width: 500px;
        display: ${(props) => (props.loadDone === true ? "flex" : "none")};
        flex-direction: column;
        .popup-info-title {
          border-bottom: 1px solid #17313a;
          .popup-info-title-wrapper {
            padding: 10px;
            img {
              width: 25px;
              height: 25px;
              margin-right: 5px;
            }
          }
        }
        .popup-info-description {
          padding: 10px 15px 0px 15px;
        }
        .popup-info-description_level {
          padding: 10px;
          ul {
            list-style: none;
            li {
              display: flex;
              align-items: center;
              padding: 5px 0;
              color: white;
              span {
                margin-right: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 25px;
                height: 25px;
                border-radius: 50%;
                border: 1px solid #17313a;
              }
              .active {
                border-color: #d47559;
              }
            }
          }
        }
      }
      .popup-champions {
        display: ${(props) => (props.loadDone === true ? "flex" : "none")};
        background-color: #0d202b;
        border-top: 1px solid #17313a;
        padding: 10px;
        align-items: center;
        .champion-img-wrapper {
          margin-left: 5px;
        }
      }
    }
  }
`;

const ChampionImg = styled.img`
  border: 1px solid #17313a;
  width: 25px;
  height: 25px;
  border-color: ${(props) => props.border_color};
  border-image: ${(props) => props.border_image};
  border-image-slice: ${(props) => (props.border_image ? "1" : "")};
`;
