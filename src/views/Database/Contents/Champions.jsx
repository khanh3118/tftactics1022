import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styled from "styled-components";
import AvatarChampion from "components/common/AvatarChampion";
import SynergyIcon from "components/common/SynergyIcon";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "contexts/DataContext";
import { useOutletContext } from "react-router-dom";

function Champions() {
  const { championsData, synergysData } = useContext(DataContext);
  const [c_data, setC_data] = useState(
    championsData.sort((a, b) => a.champion_name.localeCompare(b.champion_name))
  );
  const [increaseByName, setIncreaseByName] = useState(false);
  const [increaseByCost, setIncreaseByCost] = useState(false);
  const searchText = useOutletContext();
  
  useEffect(() => {
    setC_data(
      championsData.filter((item) =>
        item.champion_name
          .toLowerCase()
          .includes(searchText.trim().toLowerCase())
      )
    );
  }, [championsData, searchText]);
  function hanleClick(e) {
    let a = document.querySelectorAll(".table-header-item");
    a.forEach((item) => {
      item.className = "table-header-item";
    });
    let sortType = e.target.innerText;
    if (sortType === "Champion") {
      setIncreaseByCost(false);
      if (increaseByName === false) {
        setIncreaseByName(true);
        setC_data([
          ...championsData.sort((a, b) =>
            a.champion_name.localeCompare(b.champion_name)
          ),
        ]);
        e.target.className = "table-header-item increase";
      } else {
        setIncreaseByName(false);
        setC_data([
          ...championsData.sort((a, b) =>
            b.champion_name.localeCompare(a.champion_name)
          ),
        ]);
        e.target.className = "table-header-item decrease";
      }
    }
    if (sortType === "Cost") {
      setIncreaseByName(false);
      if (increaseByCost === false) {
        setIncreaseByCost(true);
        setC_data([
          ...championsData.sort((a, b) =>
            a.champion_cost.localeCompare(b.champion_cost)
          ),
        ]);
        e.target.className = "table-header-item increase";
      } else {
        setIncreaseByCost(false);
        setC_data([
          ...championsData.sort((a, b) =>
            b.champion_cost.localeCompare(a.champion_cost)
          ),
        ]);
        e.target.className = "table-header-item decrease";
      }
    }
  }
  function getSynergyImg(synergyName) {
    return synergysData.find(
      (item) => item.synergy_name.toLowerCase() === synergyName
    ).synergy_image;
  }
  return (
    <ChampionsDefault id="champions-default">
      <div className="wrapper">
        <div className="title">
          <p>
            Find a list of all the Champions in Teamfight Tactics with their
            corresponding Origins, Classes, and cost.
          </p>
        </div>
        <div className="table">
          <div className="table-header">
            <div onClick={(e) => hanleClick(e)} className="table-header-item">
              Champion
            </div>
            <div onClick={(e) => hanleClick(e)} className="table-header-item">
              Origin
            </div>
            <div onClick={(e) => hanleClick(e)} className="table-header-item">
              CLass
            </div>
            <div onClick={(e) => hanleClick(e)} className="table-header-item">
              Cost
            </div>
          </div>
          <div className="table-items">
            {c_data.map((item, index) => {
              return (
                <div key={index} className="table-item">
                  <div className="item-name-img">
                    <div className="item-name-img-wrapper">
                      <AvatarChampion
                        champion_name={item.champion_name}
                        width="40px"
                        height="40px"
                        className="item-name-img-l"
                      />
                      <span>{item.champion_name}</span>
                    </div>
                  </div>
                  {item.champion_origin.length > 0 ? (
                    <div className="item-origin">
                      {item.champion_origin.map((originName) => {
                        return (
                          <SynergyIcon
                            key={originName}
                            name={originName}
                            img_src={getSynergyImg(originName)}
                            img_alt={originName}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="item-origin"></div>
                  )}
                  {item.champion_class.length > 0 ? (
                    <div className="item-class">
                      {item.champion_class.map((className) => {
                        return (
                          <SynergyIcon
                            key={className}
                            name={className}
                            img_src={getSynergyImg(className)}
                            img_alt={className}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="item-origin"></div>
                  )}
                  <div className="item-cost">
                    <FontAwesomeIcon className="coin" icon={solid("coins")} />
                    <span>{item.champion_cost}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ChampionsDefault>
  );
}

export default Champions;

const ChampionsDefault = styled.div`
  .wrapper {
    .title {
      p {
        color: #88a0a7;
        font-size: 16px;
      }
      margin-bottom: 20px;
    }
    .table {
      .table-header {
        display: grid;
        grid-template-columns: 28% 28% 28% 16%;
        border: 1px solid #17313a;
        &:nth-child(4) {
          text-align: center;
        }
        .table-header-item {
          position: relative;
          cursor: pointer;
          padding: 10px;
          font-size: 14px;
          color: #88a0a7;
          font-weight: 600;
          &:nth-child(4) {
            text-align: center;
          }
          &:nth-child(1) {
            padding-left: 20px;
          }
        }
        .table-header-item.increase {
          box-shadow: inset 0 2px 0 0 #d47559;
        }
        .table-header-item.decrease {
          box-shadow: inset 0 -2px 0 0 #d47559;
        }
      }
      .table-items {
        .table-item {
          display: grid;
          grid-template-columns: 28% 28% 28% 16%;
          border-right: 1px solid #17313a;
          border-left: 1px solid #17313a;
          border-bottom: 1px solid #17313a;
          span {
            font-size: 15px;
            color: #6287a7;
            vertical-align: middle;
          }
          .item-name-img-wrapper,
          .item-origin,
          .item-class,
          .item-cost {
            display: flex;
            align-items: center;
            padding: 10px;
          }
          .item-name-img-wrapper {
            cursor: pointer;
            width: max-content;
            padding-left: 20px;
            .item-name-img-l {
              margin-right: 10px;
            }
            span {
              transition: all 0.2s;
            }
            &:hover {
              span {
                color: white;
              }
            }
          }
          .item-origin,
          .item-class {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            span {
              text-transform: capitalize;
              color: hsla(0, 0%, 100%, 0.9);
            }
          }
          .item-cost {
            text-align: center;
            justify-content: center;
            span {
              color: #88a0a7;
            }
            .coin {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
`;
