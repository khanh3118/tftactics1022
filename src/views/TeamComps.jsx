import MainLayout from "layouts/MainLayout";
import styled from "styled-components";
import SelectDropDown from "components/common/SelectDropdown";
import SearchOrigin from "components/common/SearchOrigin";
import { DataContext } from "contexts/DataContext";
import { useContext, useState, useEffect, useCallback } from "react";
import Button from "components/common/Button";
import Status from "components/common/Status";
import CompInfo from "components/info/CompInfo";
import SelectSide from "components/common/SelectSide";
import { getTraitsBonus } from "utils/filter";

function TeamComps() {
  const { championsData, synergysData, teamcompsData } =
    useContext(DataContext);

  const [includedTraits] = useState(() => {
    let result = teamcompsData.map((team_detail) => {
      let all = team_detail.members.map((member) => {
        let championDetail = championsData.find(
          (c) => c.champion_name === member.name
        );
        return {
          ...member,
          ...championDetail,
        };
      });
      // get array of unique synergys
      let uniqueSys = [
        ...new Set(
          all.reduce((total, current) => {
            return total
              .concat(current.champion_origin)
              .concat(current.champion_class);
          }, [])
        ),
      ];

      let allItems = all.reduce((total, current) => {
        return total.concat(current.items);
      }, []);

      let traits = getTraitsBonus(allItems, uniqueSys, synergysData, all);

      return {
        ...team_detail,
        traits,
      };
    });
    return result;
  });

  const [filteredData, setFilteredData] = useState(includedTraits);
  const [uniqueType] = useState(() => {
    let result = [];
    teamcompsData.forEach((t) => {
      result.push(t.type);
    });
    return [...new Set(result)];
  });

  const [filter, setFilter] = useState({
    search_text: "",
    styles: [],
    classes: [],
    origins: [],
  });

  useEffect(() => {
    setFilteredData([
      ...includedTraits
        .filter((f) => {
          if (
            f.name
              .toLowerCase()
              .includes(filter.search_text.trim().toLowerCase())
          )
            return true;
          if (
            f.members.find((m) =>
              m.name
                .toLowerCase()
                .includes(filter.search_text.trim().toLowerCase())
            )
          )
            return true;
          if (
            f.traits.find((t) =>
              t.name.includes(filter.search_text.trim().toLowerCase())
            )
          )
            return true;
          return false;
        })
        .filter(
          (t) => filter.styles.length === 0 || filter.styles.includes(t.type)
        )
        .filter((t) => {
          let result = false;
          filter.classes.forEach((e) => {
            t.traits.forEach((s) => {
              if (s.bonus_level > 0) {
                filter.classes.forEach((i) => {
                  if (i.toLowerCase() === s.name) result = true;
                });
              }
            });
          });
          return filter.classes.length === 0 || result;
        })
        .filter((t) => {
          let result = false;
          filter.origins.forEach((e) => {
            t.traits.forEach((s) => {
              if (s.bonus_level > 0) {
                filter.origins.forEach((i) => {
                  if (i.toLowerCase() === s.name) result = true;
                });
              }
            });
          });
          return filter.origins.length === 0 || result;
        }),
    ]);
  }, [filter, includedTraits]);

  function hanleSeach(searchText) {
    setFilter((pre) => {
      return {
        ...pre,
        search_text: searchText,
      };
    });
  }

  const addAndRemoveOrigin = useCallback((originName) => {
    setFilter((pre) => {
      if (pre.origins.includes(originName)) {
        let position = pre.origins.indexOf(originName);
        pre.origins.splice(position, 1);
      } else {
        pre.origins.push(originName);
      }
      return { ...pre };
    });
  }, []);

  const addAndRemoveClass = useCallback((className) => {
    setFilter((pre) => {
      if (pre.classes.includes(className)) {
        let position = pre.classes.indexOf(className);
        pre.classes.splice(position, 1);
      } else {
        pre.classes.push(className);
      }
      return { ...pre };
    });
  }, []);

  const addAndRemoveStyle = useCallback((type) => {
    setFilter((pre) => {
      if (pre.styles.includes(type)) {
        let position = pre.styles.indexOf(type);
        pre.styles.splice(position, 1);
      } else {
        pre.styles.push(type);
      }
      return { ...pre };
    });
  }, []);

  const resetFilter = useCallback(() => {
    setFilter({
      search_text: "",
      styles: [],
      classes: [],
      origins: [],
    });
  }, []);

  return (
    <TeamCompsWrapper id="item-builder">
      <MainLayout
        sideContent={
          <ItemBulderSideContent>
            <div className="champions-side-title">
              <span className="title-name">Filter</span>
              <button onClick={() => resetFilter()}>Reset</button>
            </div>
            <SelectSide
              expand={true}
              name="Playstyle"
              count={uniqueType.length}
            >
              {uniqueType.map((type) => {
                return (
                  <li
                    onClick={() => addAndRemoveStyle(type)}
                    key={type}
                    className={filter.styles.includes(type) ? "active" : ""}
                  >
                    {type}
                    <span className="check"></span>
                  </li>
                );
              })}
            </SelectSide>
            <SelectSide
              count={synergysData.filter((s) => s.type === "origin").length}
              name="Origin"
            >
              {synergysData
                .filter((s) => s.type === "origin")
                .map((i) => {
                  return (
                    <li
                      onClick={() => addAndRemoveOrigin(i.synergy_name)}
                      key={i.synergy_name}
                      className={
                        filter.origins.includes(i.synergy_name) ? "active" : ""
                      }
                    >
                      <img
                        className="synergy-img"
                        width={24}
                        height={24}
                        src={i.synergy_image}
                        alt=""
                      />
                      {i.synergy_name}
                      <span className="check"></span>
                    </li>
                  );
                })}
            </SelectSide>
            <SelectSide
              count={synergysData.filter((s) => s.type === "class").length}
              name="Class"
            >
              {synergysData
                .filter((s) => s.type === "class")
                .map((i) => {
                  return (
                    <li
                      onClick={() => addAndRemoveClass(i.synergy_name)}
                      key={i.synergy_name}
                      className={
                        filter.classes.includes(i.synergy_name) ? "active" : ""
                      }
                    >
                      <img
                        className="synergy-img"
                        width={24}
                        height={24}
                        src={i.synergy_image}
                        alt=""
                      />
                      {i.synergy_name}
                      <span className="check"></span>
                    </li>
                  );
                })}
            </SelectSide>
          </ItemBulderSideContent>
        }
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
                reverse={true}
                minWidth="300px"
                placeholder="Search by team, champion or trait..."
                className="search"
                hanleSearch={hanleSeach}
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
                {filteredData.map((team) => {
                  return (
                    <CompInfo
                      status={team.status}
                      key={team.name}
                      team_detail={team}
                    />
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

export default TeamComps;

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
  @media (max-width: 1024px) {
    padding-top: 20px;
    .teamcomps-title {
      flex-wrap: wrap;
      .teamcomps-title-patch {
        width: 100%;
        margin-bottom: 10px;
        #defaul-button {
          width: 100%;
          justify-content: center;
        }
      }
      .teamcomps-title-tier {
        width: 100%;
        .teamcomps-title-patch-btn {
          width: 100%;
          justify-content: center;
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
  @media (max-width: 1024px) {
    flex-wrap: wrap;
    .title-1 {
      width: 100%;
      justify-content: space-between;
      .name {
        margin-right: 0;
      }
    }
    .title-2 {
      width: 100%;
      margin-top: 10px;
      .search {
        width: 100%;
      }
    }
  }
`;

const ItemBulderSideContent = styled.div`
  color: white;
  font-size: 16px;
  .champions-side-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid #17313a;
    .title-name {
      color: hsla(0, 0%, 100%, 0.9);
      font-size: 21px;
      font-weight: 600;
    }
    button {
      cursor: pointer;
      background-color: transparent;
      border: 1px solid #17313a;
      padding: 5px 20px;
      border-radius: 3px;
    }
  }
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
