import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styled from "styled-components";
import AvatarChampion from "components/common/AvatarChampion";
import SynergyIcon from "components/common/SynergyIcon";
import { useContext, useState, useEffect } from "react";
import { DatabaseContext } from "../Contexts/DatbaseContext";
import { useOutletContext } from "react-router-dom";

function Champions() {
  const { championsData, synergysData } = useContext(DatabaseContext);
  const [ c_data, setC_data] = useState(championsData);
  const searchText = useOutletContext();
  // useEffect(() => {
  //   setC_data(championsData.filter(item => item.champion_name.toLowerCase().includes(searchText.trim().toLowerCase())));
  // }, [searchText]);
  function hanleClick(e) {
    let a = document.querySelectorAll(".table-header-item");
    a.forEach((item) => {
      item.className = "table-header-item";
    });
    e.target.className = "table-header-item active";
    console.log(e.target.innerText);
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
            {c_data
            .sort((a, b) => a.champion_name.localeCompare(b.champion_name))
            .map((item, index) => {
              return (
                <div key={index} className="table-item">
                  <div className="item-name-img">
                    <AvatarChampion
                      img_src={item.champion_img_link}
                      width="40px"
                      height="40px"
                      className="item-name-img-l"
                      cost={item.champion_cost}
                    />
                    <span>{item.champion_name}</span>
                  </div>
                  {item.champion_origin.length > 0 ? (
                    <SynergyIcon
                      name={item.champion_origin[0]}
                      img_src={getSynergyImg(item.champion_origin[0])}
                      img_alt={item.champion_origin[0]}
                      className="item-origin"
                    />
                  ) : (
                    <div className="item-origin"></div>
                  )}
                  {item.champion_class.length > 0 ? (
                    <SynergyIcon
                    name={item.champion_class[0]}
                    img_src={getSynergyImg(item.champion_class[0])}
                    img_alt={item.champion_class[0]}
                    className="item-class"
                  />
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
        .table-header-item.active {
          box-shadow: inset 0 2px 0 0 #d47559;
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
          .item-name-img,
          .item-origin,
          .item-class,
          .item-cost {
            display: flex;
            align-items: center;
            padding: 10px;
          }
          .item-name-img {
            padding-left: 20px;
            .item-name-img-l {
              margin-right: 10px;
            }
          }
          .item-origin,
          .item-class {
            span {
              text-transform: capitalize;
              color: white;
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
