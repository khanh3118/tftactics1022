import styled from "styled-components";
import AvatarChampion from "components/common/AvatarChampion";
import SynergyIcon from "components/common/SynergyIcon";
import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { DatabaseContext } from "../Contexts/DatbaseContext";

function Classes() {
  const { championsData, synergysData } = useContext(DatabaseContext);
  const [ s_data, setS_data] = useState(synergysData);
  const searchText = useOutletContext();
  useEffect(() => {
    setS_data(synergysData.filter(item => item.synergy_name.toLowerCase().includes(searchText.trim().toLowerCase())))
  }, [searchText]);
  return (
    <OriginDefault id="origin-default">
      <div className="wrapper">
        <div className="title">
          <p>
            Find a list of all the Classes in Teamfight Tactics with their
            corresponding Bonuses and Champions.
          </p>
        </div>
        <div className="table">
          <div className="table-header">
            <div className="table-header-item">Origin</div>
            <div className="table-header-item">Bonus</div>
            <div className="table-header-item">Unit</div>
          </div>
          <div className="table-items">
            {s_data
              .filter((item) => item.type === "class")
              .sort((a, b) => a.synergy_name.localeCompare(b.synergy_name))
              .map((item) => {
                return (
                  <div key={item.synergy_image} className="table-item">
                    <div className="item-origin">
                      <SynergyIcon
                        img_src={item.synergy_image}
                        name={item.synergy_name}
                      />
                    </div>
                    <div className="item-bonus">
                      <div className="item-bonus-description">
                        <p>{item.synergy_description}</p>
                      </div>
                      <div className="item-bonus-level">
                        <ul>
                          {item.synergy_description_level
                            .split("/")
                            .map((item) => {
                              let a = item.split("$");
                              return (
                                <li key={item}>
                                  <span>{a[0]}</span>
                                  {a[1]}
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                    <div className="item-unit">
                    <div className="wrapper">
                        {championsData.filter(champion => champion.champion_class.includes(item.synergy_name.toLowerCase())).map(a => {
                          return (
                            <AvatarChampion
                              key={a.champion_name}
                              img_src={a.champion_img_link}
                              img_alt={a.champion_name}
                              width="30px"
                              height="30px"
                              className="item-unit-img"
                              cost={a.champion_cost}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </OriginDefault>
  );
}

export default Classes;

const OriginDefault = styled.div`
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
        grid-template-columns: 25% 50% 25%;
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
      }
      .table-items {
        .table-item {
          display: grid;
          grid-template-columns: 25% 50% 25%;
          border-right: 1px solid #17313a;
          border-left: 1px solid #17313a;
          border-bottom: 1px solid #17313a;
          color: #88a0a7;
          font-size: 15px;
          span {
            font-size: 15px;
            color: #6287a7;
            vertical-align: middle;
          }
          .item-origin,
          .item-bonus,
          .item-unit {
            display: flex;
            align-items: center;
            padding: 10px 10px 10px 20px;
          }
          .item-bonus {
            flex-direction: column;
            align-items: flex-start;
          }
          .item-bonus {
            .item-bonus-description {
              margin-bottom: 10px;
              p {
                line-height: 150%;
              }
            }
            .item-bonus-level {
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
                }
              }
            }
          }
          .item-unit {
            padding-right: 20px;
            .wrapper {
              display: flex;
              width: 100%;
              flex-wrap: wrap;
              .item-unit-img {
                margin: 5px;
              }
            }
          }
        }
      }
    }
  }
`;
