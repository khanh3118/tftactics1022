import styled from "styled-components";
import { useLocation } from "react-router-dom";
import MainLayout from "layouts/MainLayout";
import ItemInfo from "components/info/ItemInfo";
import { DataContext } from "contexts/DataContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { capitalize } from "utils/filter";
import CharacterInfo from "components/info/CharacterInfo";

function ChampionDetail(props) {
  const { state } = useLocation();
  const { championsData, synergysData } = useContext(DataContext);
  const championName = state?.champion_name;

  const championDetail = championsData.find(
    (c) => c.champion_name === championName
  );
  return (
    <ChampionDetailWrapper>
      <MainLayout
        sideContent={
          <ChampionDetailSideContent>
            <div className="side-content-avatar">
              <div className="side-content-avatar-img">
                <img src={championDetail.champion_img_link} alt="" />
              </div>
              <span>TFT {championDetail.champion_name}</span>
            </div>
            <div className="side-content-build">
              <div className="side-content-build-title">
                <span>Item Build</span>
              </div>
              <div className="side-content-build-items">
                {championDetail.champion_items.map((itemName) => {
                  return (
                    <ItemInfo
                      className="side-content-build-item"
                      key={itemName}
                      width="40px"
                      height="40px"
                      item_name={itemName}
                    />
                  );
                })}
              </div>
            </div>
            <div className="side-content-stats">
              <div className="side-content-stats-title">
                <span>Stats</span>
              </div>
              <ul className="side-content-stats-wrapper">
                <li>
                  Cost:{" "}
                  <FontAwesomeIcon className="coin" icon={solid("coins")} />{" "}
                  <span>{championDetail.champion_cost}</span>
                </li>
                <li>
                  Health: <span>{championDetail.champion_health}</span>
                </li>
                <li>
                  Mana: <span>{championDetail.champion_mana}</span>
                </li>
                {championDetail?.champion_starting_mana && (
                  <li>
                    Starting Mana:{" "}
                    <span>{championDetail?.champion_starting_mana}</span>
                  </li>
                )}
                <li>
                  Armor: <span>{championDetail.champion_armor}</span>
                </li>
                <li>
                  MR: <span>{championDetail.champion_mr}</span>
                </li>
                <li>
                  DPS: <span>{championDetail.champion_dps}</span>
                </li>
                <li>
                  Damage: <span>{championDetail.champion_damage}</span>
                </li>
                <li>
                  Atk Spd: <span>{championDetail.champion_akt_spd}</span>
                </li>
                <li>
                  Crit Rate: <span>{championDetail.champion_crit_rate}</span>
                </li>
                <li>
                  Range: <span>{championDetail.champion_range}</span>
                </li>
              </ul>
            </div>
          </ChampionDetailSideContent>
        }
        mainContent={
          <ChampionDetailMainContent>
            <div className="main-content-abilities">
              <div className="main-content-abilities-title">
                <span>Abilities</span>
              </div>
              <div className="main-content-abilities-skill">
                <div className="main-content-abilities-skill-img">
                  <img src={championDetail.skill_img_link} alt="" />
                </div>
                <div className="main-content-abilities-skill-description">
                  <div className="skill-stats">
                    <div className="skill-stats-name-type">
                      <div className="skill-name">
                        {championDetail.skill_name}
                      </div>
                      <div className="skill-type">
                        {capitalize(championDetail.skill_type)}
                      </div>
                    </div>
                    <div className="skill-stats-mana">
                      <FontAwesomeIcon icon={solid("droplet")} />{" "}
                      {championDetail?.champion_starting_mana} /{" "}
                      {championDetail.champion_mana}
                    </div>
                  </div>
                  <div className="skill-description">
                    {championDetail.skill_description}
                  </div>
                  <div className="skill-description-level">
                    <ul>
                      {championDetail.skill_description_level
                        .split("#")
                        .map((item, index) => {
                          let a = item.split("@");
                          return (
                            <li key={index}>
                              <span>{a[0]}</span>
                              {a[1]}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="main-content-abilities-traits">
                {championDetail.champion_origin
                  .concat(championDetail.champion_class)
                  .map((i) =>
                    synergysData.find((s) => s.synergy_name.toLowerCase() === i)
                  )
                  .map((t) => {
                    return (
                      <div className="main-content-abilities-skill">
                        <div className="main-content-abilities-trait-img">
                          <img src={t.synergy_image} alt="" />
                        </div>
                        <div className="main-content-abilities-skill-description">
                          <div className="skill-stats">
                            <div className="skill-stats-name-type">
                              <div className="skill-name">{t.synergy_name}</div>
                              <div className="skill-type">
                                {capitalize(capitalize(t.type))}
                              </div>
                            </div>
                          </div>
                          <div className="skill-description">
                            {t.synergy_description}
                          </div>
                          <div className="skill-description-level">
                            <ul>
                              {t.synergy_description_level
                                .split("/")
                                .map((item, index) => {
                                  let a = item.split("$");
                                  return (
                                    <li key={index}>
                                      <span className="skill-description-level-bonus">
                                        {a[0]}
                                      </span>
                                      {a[1]}
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="main-content-trait">
              <div className="main-content-trait-title">
                <span>Synergies</span>
              </div>
              {championDetail.champion_class
                .concat(championDetail.champion_origin)
                .map((t) =>
                  synergysData.find((s) => s.synergy_name.toLowerCase() === t)
                )
                .map((t) => {
                  return (
                    <div className="main-content-trait-item">
                      <div className="main-content-trait-item-img">
                        <img src={t.synergy_image} alt="" />
                      </div>
                      <div className="main-content-trait-members">
                        {championsData
                          .filter(
                            (c) =>
                              (c.champion_origin.includes(
                                t.synergy_name.toLowerCase()
                              ) ||
                                c.champion_class.includes(
                                  t.synergy_name.toLowerCase()
                                )) &&
                              c.champion_name !== championDetail.champion_name
                          )
                          .map((f) => {
                            return (
                              <CharacterInfo
                                className="main-content-trait-member"
                                width="50px"
                                height="50px"
                                champion_name={f.champion_name}
                              />
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </ChampionDetailMainContent>
        }
      />
    </ChampionDetailWrapper>
  );
}

export default ChampionDetail;

const ChampionDetailWrapper = styled.div``;

const ChampionDetailSideContent = styled.div`
  .side-content-avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    .side-content-avatar-img {
      border-radius: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      width: 110px;
      height: 110px;
      margin-bottom: 5px;
      img {
        width: 120px;
        height: 120px;
      }
    }

    span {
      font-size: 21px;
      font-weight: 600;
    }
  }
  .side-content-build {
    .side-content-build-title {
      margin-bottom: 20px;
      border-bottom: 1px solid #17313a;
      span {
        line-height: 100%;
        color: hsla(0, 0%, 100%, 0.9);
        font-size: 21px;
        font-weight: 600;
        display: inline-block;
        padding: 0 10px 15px 10px;
        border-bottom: 4px solid #d47559;
      }
    }
    .side-content-build-items {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      margin-bottom: 20px;
      background: #102531;
      border: 1px solid #17313a;
      .side-content-build-item {
        margin: 0 10px;
      }
    }
  }
  .side-content-stats {
    .side-content-stats-title {
      margin-bottom: 20px;
      border-bottom: 1px solid #17313a;
      span {
        line-height: 100%;
        color: hsla(0, 0%, 100%, 0.9);
        font-size: 21px;
        font-weight: 600;
        display: inline-block;
        padding: 0 10px 15px 10px;
        border-bottom: 4px solid #d47559;
      }
    }
    .side-content-stats-wrapper {
      list-style: none;
      li {
        font-size: 16px;
        color: #88a0a7;
        margin-bottom: 10px;
        span {
          color: white;
        }
      }
    }
  }
`;

const ChampionDetailMainContent = styled.div`
  padding-left: 30px;
  color: #88a0a7;
  .main-content-abilities {
    .main-content-abilities-title {
      margin-bottom: 20px;
      border-bottom: 1px solid #17313a;
      span {
        line-height: 100%;
        color: hsla(0, 0%, 100%, 0.9);
        font-size: 21px;
        font-weight: 600;
        display: inline-block;
        padding: 0 10px 15px 10px;
        border-bottom: 4px solid #d47559;
      }
    }
    .main-content-abilities-skill {
      background: #102531;
      padding: 20px;
      margin-bottom: 20px;
      display: flex;
      border: 1px solid #17313a;
      .main-content-abilities-skill-img {
        img {
          width: 60px;
          height: 60px;
        }
      }
      .main-content-abilities-trait-img {
        img {
          width: 32px;
          height: 32px;
        }
      }
      .main-content-abilities-skill-description {
        margin-left: 30px;
        .skill-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          .skill-stats-name-type {
            .skill-name {
              color: hsla(0, 0%, 100%, 0.9);
              font-size: 21px;
              font-weight: 600;
              margin-bottom: 10px;
            }
            .skill-type {
              font-size: 16px;
              line-height: 1em;
            }
          }
          .skill-stats-mana {
            svg {
              color: rgb(63, 170, 252);
            }
          }
        }
        .skill-description {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .skill-description-level {
          ul {
            list-style: none;
            li {
              font-size: 16px;
              color: white;
              display: flex;
              align-items: center;
              margin: 10px 0;
              span {
                color: #88a0a7;
                margin-right: 5px;
              }
              .skill-description-level-bonus {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 1px solid #17313a;
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
  .main-content-trait {
    .main-content-trait-title {
      margin-bottom: 20px;
      border-bottom: 1px solid #17313a;
      span {
        line-height: 100%;
        color: hsla(0, 0%, 100%, 0.9);
        font-size: 21px;
        font-weight: 600;
        display: inline-block;
        padding: 0 10px 15px 10px;
        border-bottom: 4px solid #d47559;
      }
    }
    .main-content-trait-item {
      border: 1px solid #17313a;
      background: #102531;
      border-radius: 4px;
      padding: 20px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      .main-content-trait-item-img {
        margin-right: 20px;
        img {
          width: 28px;
          height: 28px;
        }
      }
      .main-content-trait-members {
        display: flex;
        flex-wrap: wrap;
        .main-content-trait-member {
          padding: 5px 10px;
        }
      }
    }
  }
`;
