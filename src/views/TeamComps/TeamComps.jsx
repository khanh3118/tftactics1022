import MainLayout from "layouts/MainLayout";
import styled from "styled-components";
import SelectDropDown from "components/common/SelectDropdown";
import SearchOrigin from "components/common/SearchOrigin";
import { DataContext } from "contexts/DataContext";
import { useContext } from "react";
import { useState } from "react";
import AvatarItem from "components/common/AvatarItem";
import { useEffect } from "react";
import { capitalize } from "utils/filter";
import Button from "components/common/Button";
import Status from "components/common/Status";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarChampion from "components/common/AvatarChampion";

const team_comps = [
  {
    name: "Darkflight Assassins",
    type: "standard",
    tier: "s",
    status: "up",
    members: [
      {
        name: "Aphelios",
        position: 28,
        max_level: false,
        items: [],
      },
      {
        name: "Qiyana",
        position: 18,
        max_level: false,
        items: [],
      },
      {
        name: "Rell",
        position: 5,
        max_level: false,
        items: [],
      },
      {
        name: "Diana",
        position: 25,
        max_level: false,
        items: [],
      },
      {
        name: "Rengar",
        position: 27,
        max_level: true,
        items: ["Hand of Justice", "Infinity Edge", "Runaan's Hurricane"],
      },
      {
        name: "Nilah",
        position: 26,
        max_level: false,
        items: [],
      },
      {
        name: "Swain",
        position: 12,
        max_level: false,
        items: ["Archangel's Staff", "Morellonomicon"],
      },
    ],
    early_comp: ["Ezreal", "Sejuani", "Qiyana", "Rell", "Rengar"],
    carousel: ["B.F. Sword"],
    options: [
      {
        replace_from: ["lvlup"],
        replace_to: ["Rengar", "Graves"],
      },
      {
        replace_from: ["Diana", "Nilah"],
        replace_to: ["Sejuani", "Graves"],
      },
    ],
  },
];

function ItemBuilder() {
  const { itemsData } = useContext(DataContext);
  return (
    <TeamCompsWrapper id="item-builder">
      <MainLayout
        sideContent={<ItemBulderSideContent></ItemBulderSideContent>}
        titleContent={
          <Title className="title">
            <div className="title-1">
              <div className="name">TFT Meta Team Comps Tier List</div>
              <SelectDropDown
                dropDownItems={[{ text: "Set 7.5", isSelected: true }]}
                placeholder="Set 7.5"
                className="dropdown"
              />
            </div>
            <div className="title-2">
              <SearchOrigin
                placeholder="Search by team, champion or trait..."
                className="search"
              />
            </div>
          </Title>
        }
        mainContent={
          <TeamCompsMainContent>
            <div className="teamcomps-title">
              <div className="teamcomps-title-patch">
                <Button
                  className="teamcomps-title-patch-btn"
                  btnText="Patch 12.20b"
                />
              </div>
              <div className="teamcomps-title-tier">
                <Button className="teamcomps-title-patch-btn" btnText="Tier Up">
                  <Status status="up" />
                </Button>
                <Button
                  className="teamcomps-title-patch-btn"
                  btnText="Tier Down"
                >
                  <Status status="down" />
                </Button>
                <Button className="teamcomps-title-patch-btn" btnText="New">
                  <Status status="new" />
                </Button>
              </div>
            </div>
            <div className="team-comps-wrapper">
              <div className="team-comps">
                {team_comps.map((team) => {
                  return (
                    <div key={team.name} className="team-comps-item">
                      <div className="team-comps-item-line-1">
                        <div className="item-line-1-name">
                          <div className="item-line-1-name-tier">
                            <button>{team.tier}</button>
                          </div>
                          <div className="item-line-1-name-info">
                            <div className="info-name">
                              {team.name}
                            </div>
                            <div className="info-tier">
                              <button>{capitalize(team.type)}</button>
                            </div>
                          </div>
                        </div>
                        <div className="item-line-1-member">
                          {team.members.map((member) => {
                            return (
                              <div key={member.name} className="member">
                                <AvatarChampion
                                  items_equip={member.items}
                                  className="member-image"
                                  width="45px"
                                  heigth="45px"
                                  champion_name={member.name}
                                />
                                <span className="member-name">{member.name}</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="item-line-1-btn">
                          <FontAwesomeIcon
                            className="open-icon"
                            size="xs"
                            icon={solid("chevron-down")}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TeamCompsMainContent>
        }
      />
    </TeamCompsWrapper>
  );
}

export default ItemBuilder;

const TeamCompsMainContent = styled.div`
  padding-top: 20px;
  .teamcomps-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .teamcomps-title-patch {
    }
    .teamcomps-title-patch-btn {
      color: #88a0a7;
      background: #123040;
      border-radius: 3px;
      :nth-child(2) {
        margin-right: 10px;
      }
      :nth-child(1) {
        margin-right: 10px;
      }
    }
    .teamcomps-title-tier {
      display: flex;
      align-items: center;
    }
  }
  .team-comps-item {
    margin-bottom: 10px;
    border: 1px solid #17313a;
    .team-comps-item-line-1 {
      cursor: pointer;
      display: grid;
      grid-template-columns: 30% 67% 3%;
      .item-line-1-name {
        display: flex;
        align-items: center;
        padding: 10px 10px 10px 20px;
        .item-line-1-name-tier {
          display: flex;
          align-items: center;
          margin-right: 15px;
          button {
            text-transform: uppercase;
            border: none;
            border-radius: 4px;
            background-color: #ff7f7f;
            width: 25px;
            height: 25px;
            color: #0d202b;
            font-weight: 600;
          }
        }
        .item-line-1-name-info {
          .info-name {
          }
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
      .item-line-1-member {
        padding: 10px 0;
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
      .item-line-1-btn {
        display: flex;
        align-items: center;
        .open-icon {
          cursor: pointer;
          color: #88a0a7;
        }
      }
    }
  }
`;

const TeamCompsWrapper = styled.div`
  .content {
    padding-left: 30px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  min-width: 29px;
  border-bottom: 1px solid #17313a;
  .title-1 {
    display: flex;
    align-items: center;
    .name {
      margin-right: 30px;
      font-size: 21px;
      font-weight: 600;
    }
  }
  .title-2 {
    .search {
      border-radius: 0%;
      width: 300px;
    }
  }
`;

const ItemBulderSideContent = styled.div`
  color: white;
  font-size: 16px;
  .sidecontent-search {
    margin-bottom: 20px;
  }
  h1 {
    color: white;
    font-size: 21px;
    margin-bottom: 20px;
  }
  .sidecontent-search {
    border-radius: 0;
  }
`;
