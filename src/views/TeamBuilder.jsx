import styled from "styled-components";
import SelectDropdown from "components/common/SelectDropdown";
import { useContext, useState, useEffect, Fragment, Suspense } from "react";
import { DataContext } from "contexts/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import ItemInfo from "components/info/ItemInfo";
import { lazy } from "react";
import SearchCard from "components/common/SearchCard";

const HexagonTeamBuilder = lazy(() =>
  import("components/common/HexagonTeamBuilder")
);
const PartialTraitsItem = lazy(() =>
  import("components/common/PartialTraitsItem")
);
const CharacterInfo = lazy(() => import("components/info/CharacterInfo"));

export default function TeamBuilder(pros) {
  const { championsData, synergysData, itemsData } = useContext(DataContext);
  const [members, setMembers] = useState([
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
      items: ["Mage Emblem", "Infinity Edge", "Runaan's Hurricane"],
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
  ]);
  function setAllFnc() {
    return members.map((member) => {
      let championDetail = championsData.find(
        (c) => c.champion_name === member.name
      );
      return {
        ...member,
        ...championDetail,
      };
    });
  }
  const [all, setAll] = useState(setAllFnc());
  useEffect(() => {
    setAll([...setAllFnc()]);
  }, [members]);

  function setAllItemFnc() {
    return all.reduce((total, current) => {
      return total.concat(current.items);
    }, []);
  }
  const [allItem, setAllItem] = useState(setAllItemFnc());
  useEffect(() => {
    setAllItem([...setAllItemFnc()]);
  }, [all]);

  function setAllRecipesFnc() {
    return allItem.reduce((all, curr) => {
      let a = itemsData.find((i) => i.item_name === curr);
      return all.concat(a.recipe_1).concat(a.recipe_2);
    }, []);
  }
  const [allRecipes, setAllRecipes] = useState(setAllRecipesFnc());
  useEffect(() => {
    setAllRecipes([...setAllRecipesFnc()]);
  }, [allItem]);

  function setUniqueSysFnc() {
    return [
      ...new Set(
        all.reduce((total, current) => {
          return total
            .concat(current.champion_origin)
            .concat(current.champion_class);
        }, [])
      ),
    ];
  }
  const [uniqueSys, setUniqueSys] = useState(setUniqueSysFnc());

  useEffect(() => {
    setUniqueSys([...setUniqueSysFnc()]);
  }, [all]);

  function getPartialTraits() {
    // add synergy from item
    allItem.forEach((item) => {
      switch (item) {
        case "Lagoon Emblem":
          !uniqueSys.includes("Lagoon") && uniqueSys.push("Lagoon");
          break;
        case "Dragonmancer Emblem":
          !uniqueSys.includes("Dragonmancer") && uniqueSys.push("Dragonmancer");
          break;
        case "Mage Emblem":
          !uniqueSys.includes("Mage") && uniqueSys.push("Mage");
          break;
        case "Shimmerscale Emblem":
          !uniqueSys.includes("Shimmerscale") && uniqueSys.push("Shimmerscale");
          break;
        case "Swiftshot Emblem":
          !uniqueSys.includes("Swiftshot") && uniqueSys.push("Swiftshot");
          break;
        case "Cavalier Emblem":
          !uniqueSys.includes("Cavalier") && uniqueSys.push("Cavalier");
          break;
        case "Mirage Emblem":
          !uniqueSys.includes("Mirage") && uniqueSys.push("Mirage");
          break;
        default:
          break;
      }
    });
    // array of object synergy detail data
    let data = [];
    data = uniqueSys.map((item) => {
      let count = 0; // count synergy
      let lvls = []; // level bonus array
      // level bonus from synergy description
      synergysData
        .find((s) => s.synergy_name.toLowerCase() === item.toLowerCase())
        ?.synergy_description_level.split("/")
        .forEach((i, index) => {
          if (index === 0) {
            lvls.push(i.split("$")[0]);
          } else {
            lvls.push(i.split("$")[0].split("\n")[1]);
          }
        });
      // count synergy from champion
      let championUnique = [];
      all.forEach(c => {
        if (!championUnique.find(i => i?.champion_name === c.champion_name)) {
          championUnique.push(c);
        }
      })
      championUnique.forEach((a) => {
        if (
          a.champion_class.includes(item) ||
          a.champion_origin.includes(item)
        ) {
          if (a.is_dragon === "true" && item !== "dragon") {
            count += 3;
          } else {
            count += 1;
          }
        }
      });
      // count synergy from item
      allItem.forEach((i) => {
        switch (i) {
          case "Lagoon Emblem":
            if (item === "Lagoon") count = count + 1;
            break;
          case "Dragonmancer Emblem":
            if (item === "Dragonmancer") count = count + 1;
            break;
          case "Mage Emblem":
            if (item === "Mage") count = count + 1;
            break;
          case "Shimmerscale Emblem":
            if (item === "Shimmerscale") count = count + 1;
            break;
          case "Swiftshot Emblem":
            if (item === "Swiftshot") count = count + 1;
            break;
          case "Cavalier Emblem":
            if (item === "Cavalier") count = count + 1;
            break;
          case "Mirage Emblem":
            if (item === "Mirage") count = count + 1;
            break;
          default:
            break;
        }
      });
      // get bonus level
      let bonus_level = 0;
      lvls.forEach((lvl) => {
        if (count >= lvl) {
          bonus_level += 1;
        }
      });
      return { name: item, count, lvls, bonus_level };
    });
    return data.sort(
      (a, b) =>
        b.bonus_level - a.bonus_level ||
        b.count - a.count ||
        a.name.localeCompare(b.name)
    );
  }
  const [partialTraits, setPartialTraits] = useState(getPartialTraits());

  useEffect(() => {
    setPartialTraits([...getPartialTraits()]);
  }, [allItem, uniqueSys, all]);

  function getHexagonData(position) {
    let result = members.find((member) => Number(member.position) === position);
    result = {
      ...result,
      cost: championsData.find((c) => c.champion_name === result?.name)
        ?.champion_cost,
    };
    return result;
  }
  function hanleChangeLevel(position, is_max_level) {
    setMembers((pre) => {
      pre.find((member) => member.position === position).max_level =
        !is_max_level;
      return [...pre];
    });
  }
  function createElementsFromNumber(n) {
    var elements = [];
    for (let i = 0; i < n; i++) {
      elements.push(
        <Suspense>
          <HexagonTeamBuilder
            hanle_change_level={hanleChangeLevel}
            data={getHexagonData(i + 1)}
            key={i + 1}
            position={i + 1}
            className="team-builder-drag-item"
            hanle_on_drop={ondrop}
          />
        </Suspense>
      );
    }
    return elements;
  }
  function searchCharacter(a) {
    console.log(a);
  }
  function ondrop(e, position, is_empty) {
    if (e.dataTransfer.getData("champion_name")) {
      let champion_name = e.dataTransfer.getData("champion_name");
      if (is_empty) {
        setMembers((pre) => {
          pre.push({
            name: champion_name,
            position,
            items: [],
            max_level: false,
          });
          return [...pre];
        });
      } else {
        console.log("first");
        setMembers((pre) => {
          let r = pre.find((m) => m.position === position);
          r.name = champion_name;
          r.items = [];
          r.max_level = false;
          return [...pre];
        });
      }
    }
    if (e.dataTransfer.getData("item_name")) {
      let item_name = e.dataTransfer.getData("item_name");
      if (is_empty === false) {
        setMembers((pre) => {
          let a = pre.find((m) => m.position === position);
          if (a.items.length < 3) {
            a.items.push(item_name);
          }
          return [...pre];
        });
      }
    }
  }
  return (
    <TeamBuilderWrapper>
      <div className="team-builder-title">
        <div className="team-builder-title-info">
          <div className="team-builder-title-info-name">
            <span>TFT Team Builder</span>
          </div>
          <div className="team-builder-title-info-version">
            <SelectDropdown
              dropDownItems={[{ text: "Set 7.5", isSelected: true }]}
              placeholder={"Set 7.5"}
            />
          </div>
        </div>
        <div className="team-builder-title-filter">
          <div className="team-builder-title-filter-partial-traits">
            <span>Show Partial Traits</span>
          </div>
          <div className="team-builder-title-filter-clear-team">
            <button>
              <span>Clear Team</span>
            </button>
          </div>
          <div className="team-builder-title-filter-share">
            <button>
              <span>SHARE</span>
            </button>
          </div>
        </div>
      </div>
      <div className="team-builder-wrapper">
        <div className="team-builder">
          <div className="team-builder-synergy">
            <Suspense>
              {partialTraits.map((item) => {
                return (
                  <PartialTraitsItem
                    lvls={item.lvls}
                    width="20px"
                    height="20px"
                    count={item.count}
                    hide_name={true}
                    synergy_name={item.name}
                    bonus_level={item.bonus_level}
                    key={item.name}
                  />
                );
              })}
            </Suspense>
          </div>
          <div className="team-builder-drag">
            <div className="team-builder-drag-line-1">
              <div className="team-builder-drag-field">
                {createElementsFromNumber(28)}
              </div>
              <div className="team-builder-drag-recipe">
                <div className="team-builder-drag-recipe-item">
                  {allRecipes.map((a, index) => {
                    return (
                      <ItemInfo
                        key={a + index}
                        className="team-builder-drag-recipe-item-a"
                        width="27px"
                        height="27px"
                        item_name={a}
                      />
                    );
                  })}
                </div>
                {allItem.map((i, index) => {
                  return (
                    <div
                      key={i + index}
                      className="team-builder-drag-recipe-item"
                    >
                      <span>
                        <ItemInfo width="30px" height="30px" item_name={i} />
                      </span>
                      <span>
                        <FontAwesomeIcon icon={solid("equals")} />
                      </span>
                      <span>
                        <ItemInfo
                          width="24px"
                          height="24px"
                          item_name={
                            itemsData.find((d) => d.item_name === i).recipe_1
                          }
                        />
                      </span>
                      <span>
                        <ItemInfo
                          width="24px"
                          height="24px"
                          item_name={
                            itemsData.find((d) => d.item_name === i).recipe_2
                          }
                        />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="team-builder-drag-line-2">
              <div className="team-builder-drag-champions">
                <SearchCard
                  filter={
                    <Fragment>
                      <div className="filter active">
                        <span>A-Z</span>
                      </div>
                      <div className="filter">
                        <span>
                          <FontAwesomeIcon
                            className="coin"
                            icon={solid("coins")}
                          />
                        </span>
                      </div>
                    </Fragment>
                  }
                  hanle_search={searchCharacter}
                  placeholder="Search by name, trait, or cost..."
                >
                  {championsData.map((c) => {
                    return (
                      <div
                        key={c.champion_name}
                        className="team-builder-drag-champion-wrapper"
                      >
                        <Suspense>
                          <CharacterInfo
                            champion_name={c.champion_name}
                            width="42px"
                            height="42px"
                          />
                        </Suspense>
                      </div>
                    );
                  })}
                </SearchCard>
              </div>
              <div className="team-builder-drag-items">
                <SearchCard placeholder="Search by name...">
                  {itemsData.map((i, index) => {
                    return (
                      <div
                        key={i.item_name + index}
                        className="team-builder-drag-item-wrapper"
                      >
                        <ItemInfo
                          width="30px"
                          height="30px"
                          item_name={i.item_name}
                        />
                      </div>
                    );
                  })}
                </SearchCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TeamBuilderWrapper>
  );
}

const TeamBuilderWrapper = styled.div`
  color: white;
  min-height: 100vh;
  padding-bottom: 50px;
  .team-builder-title {
    display: flex;
    justify-content: space-between;
    padding: 0 0 30px 0;
    border-bottom: 1px solid #17313a;
    .team-builder-title-info {
      display: flex;
      align-items: center;
      .team-builder-title-info-name {
        margin-right: 10px;
      }
      .team-builder-title-info-version {
      }
    }
    .team-builder-title-filter {
      display: flex;
      align-items: center;
      .team-builder-title-filter-partial-traits {
        margin-right: 10px;
      }
      .team-builder-title-filter-clear-team,
      .team-builder-title-filter-share {
        button {
          min-height: 35px;
          padding: 0 20px;
          font-size: 14px;
        }
      }
      .team-builder-title-filter-clear-team {
        margin-right: 10px;
        button {
          border: 1px solid #17313a;
          background: transparent;
        }
      }
      .team-builder-title-filter-share {
        button {
          font-weight: 600;
          background-color: #4080b0;
          border-radius: 4px;
        }
      }
    }
  }
  .team-builder-wrapper {
    padding-top: 30px;
    .team-builder {
      display: grid;
      grid-template-columns: 200px auto;
      .team-builder-drag {
        .team-builder-drag-line-1 {
          display: flex;
          height: max-content;
          .team-builder-drag-field {
            height: min-content;
            width: 100%;
            max-width: 700px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
          }
          .team-builder-drag-recipe {
            flex-grow: 1;
            padding-left: 50px;
            .team-builder-drag-recipe-item {
              max-width: 250px;
              padding: 5px;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
              background-color: #102531;
              border: 1px solid #17313a;
              min-height: 46px;
              margin-bottom: 20px;
              border-radius: 4px;
              .team-builder-drag-recipe-item-a {
                padding: 2.5px;
              }
              span {
                margin-right: 10px;
              }
            }
          }
        }
        .team-builder-drag-line-2 {
          display: flex;
          display: grid;
          grid-template-columns: calc(68% + 2px) auto;
          .team-builder-drag-champions {
            padding-left: 20px;
            display: flex;
            flex-wrap: wrap;
            margin-right: 20px;
            .team-builder-drag-champion-wrapper {
              padding: 5px 10px;
            }
            .search-filter {
              color: #88a0a7;
              align-items: stretch;
              .filter {
                justify-content: center;
                min-width: 50px;
                padding: 0 10px;
                background-color: transparent;
                display: flex;
                align-items: center;
                border-left: 1px solid #17313a;
              }
              .active {
                background-color: #123040;
              }
              span {
                font-size: 12px;
              }
            }
          }
          .team-builder-drag-items {
            .team-builder-drag-item-wrapper {
              display: flex;
              justify-content: center;
              width: 16.66%;
              padding: 5px;
            }
          }
        }
        .team-builder-drag-item {
          &:nth-child(8),
          &:nth-child(22) {
            margin-left: 88px;
          }
        }
      }
    }
  }
`;
