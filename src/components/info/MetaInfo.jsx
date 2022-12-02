import styled from "styled-components";
import TierStatus from "components/common/TierStatus";
import CharacterInfo from "components/info/CharacterInfo";
import React, { lazy, Suspense, memo } from "react";
import { BONUS_LEVEL_COLOR } from "config/color";

const SynergyInfo = lazy(() => import("components/info/SynergyInfo"));

const MetaInfo = memo((props) => {
  function contestedColor(type) {
    if (type === "High") return { color: "red" };
    if (type === "Medium") return { color: "hsla(0,0%,100%,.9)" };
    if (type === "Low") return { color: "#4caf50" };
  }
  return (
    <MetaInfoWrapper>
      <div key={props.team_detail.name} className="team-comps-item">
        <div className="team-comps-item-line-1">
          <div className="item-line-1-name">
            <div className="item-line-1-name-tier">
              <TierStatus tier={props.team_detail.tier.toLowerCase()} />
            </div>
            <div className="item-line-1-name-info">
              <div className="info-name">{props.team_detail.name}</div>
            </div>
          </div>
          <div className="item-line-1-wrapper">
            <div className="item-line-1-member">
              {props.team_detail.members.map((member) => {
                return (
                  <div key={member.name} className="member">
                    <CharacterInfo
                      key={member.name}
                      max_level={member.max_level}
                      items_equip={member.member_items}
                      className="member-image"
                      width="45px"
                      height="45px"
                      champion_name={member.member_name}
                    />
                    <span className="member-name">{member.member_name}</span>
                  </div>
                );
              })}
            </div>
            <div className="team-comps-item-line-2-item">
              <div className="team-comps-item-line-2-synergy-icon-wrapper">
                {props.team_detail.traits
                  .sort(
                    (a, b) => b.bonus_level - a.bonus_level || b.count - a.count
                  )
                  .map((item) => {
                    return (
                      item.bonus_level >= 1 && (
                        <SynergyInfoWrapper
                          key={item.name}
                          bonus_level_color={
                            BONUS_LEVEL_COLOR[item.bonus_level]
                          }
                        >
                          <Suspense>
                            <SynergyInfo
                              width="20px"
                              height="20px"
                              count={item.count}
                              hide_name={true}
                              synergy_name={item.name}
                              bonus_level={item.bonus_level}
                            />
                          </Suspense>
                        </SynergyInfoWrapper>
                      )
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="team-comps-item-line-2">
          <div className="team-comps-item-line-2-stats">
            Avg Place: <span>{props.team_detail.avg_place}</span>
          </div>
          <div className="team-comps-item-line-2-stats">
            Winrate: <span>{props.team_detail.win_rate}</span>
          </div>
          <div className="team-comps-item-line-2-stats">
            Top 4: <span>{props.team_detail.top_4}</span>
          </div>
          <div className="team-comps-item-line-2-stats">
            Contested:{" "}
            <span
              style={contestedColor(props.team_detail.contested.split(" ")[1])}
            >
              {props.team_detail.contested.split(" ")[1]}{" "}
            </span>
            {props.team_detail.contested.split(" ")[2]}
          </div>
        </div>
      </div>
    </MetaInfoWrapper>
  );
});

export default MetaInfo;

const SynergyInfoWrapper = styled.div`
  margin-right: 5px;
  margin-bottom: 10px;
  height: min-content;
  display: flex;
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

const MetaInfoWrapper = styled.div`
  .team-comps-item {
    cursor: pointer;
    margin-bottom: 10px;
    border: 1px solid;
    border-color: ${(props) => (props.is_opened ? "#227aad" : "#17313a")};
    background-color: #102531;
    .team-comps-item-line-1 {
      display: grid;
      grid-template-columns: 30% 67% 3%;
      position: relative;
      .team-comps-item-line-1-compstatus {
        width: 22px;
        height: 22px;
        border: 1px solid #17313a;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        background-color: #0d202b;
        transform: translate(-50%, -50%);
        .legend-down {
          transform: translateY(-3px) translateX(-2px);
        }
      }
      .item-line-1-name {
        display: flex;
        align-items: center;
        padding: 10px 10px 10px 20px;
        .item-line-1-name-tier {
          display: flex;
          align-items: center;
          margin-right: 15px;
        }
        .item-line-1-name-info {
          .info-tier {
            margin-top: 2px;
            button {
              padding: 2px 4px;
              border: none;
              background-color: #123040;
              color: #88a0a7;
              border-radius: 4px;
              width: max-content;
              font-size: 12px;
            }
          }
        }
      }
      .item-line-1-wrapper {
        .item-line-1-member {
          padding: 10px 10px 0 10px;
          display: flex;
          .member {
            padding: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .member-image {
            }
            .member-name {
              margin-top: 3px;
              color: #88a0a7;
              font-size: 11px;
            }
          }
        }
        .team-comps-item-line-2-item {
          padding: 0 15px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .team-comps-item-line-2-synergy-icon-wrapper {
            display: flex;
            flex-wrap: wrap;
            margin-top: 10px;
          }
        }
      }
      .item-line-1-btn {
        display: flex;
        align-items: center;
        .open-icon {
          cursor: pointer;
          color: #88a0a7;
        }
      }
    }
    .team-comps-item-line-2 {
      width: 100%;
      background: #0d202b;
      border-top: 1px solid #17313a;
      display: flex;
      align-items: center;
      padding: 10px 20px;
      text-align: center;
      font-size: 14px;
      color: #88a0a7;
      .team-comps-item-line-2-stats {
        flex-grow: 1;
        span {
          color: hsla(0, 0%, 100%, 0.9);
        }
      }
    }
  }
  @media (max-width: 1024px) {
    .item-line-1-member {
      flex-wrap: wrap;
    }
  }
`;
