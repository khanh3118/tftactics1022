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
  const { championsData, synergysData, itemsData, teamcompsData } =
    useContext(DataContext);
  const [characterData, setCharacterData] = useState(
    championsData.sort((a, b) => a.champion_name.localeCompare(b.champion_name))
  );
  const [showPartialTraits, setShowPartialTraits] = useState(true);
  const [characterFilter, setCharacterFilter] = useState({
    text: "",
    type: "abc",
  });
  function searchCharacter(searchText) {
    setCharacterFilter((pre) => {
      return {
        ...pre,
        text: searchText,
      };
    });
  }
  const [unfilterCharacter, setUnfilterCharacter] = useState(
    championsData.sort((a, b) => a.champion_name.localeCompare(b.champion_name))
  );
  useEffect(() => {
    setCharacterData((pre) => {
      let data = championsData.filter((c) => {
        return (
          c.champion_name.toLowerCase().includes(characterFilter.text) ||
          c.champion_origin.includes(characterFilter.text) ||
          c.champion_class.includes(characterFilter.text) ||
          c.champion_cost === characterFilter.text
        );
      });
      if (characterFilter.type === "abc") {
        return data.sort((a, b) =>
          a.champion_name.localeCompare(b.champion_name)
        );
      }
      if (characterFilter.type === "cost") {
        return data.sort(
          (a, b) => Number(a.champion_cost) - Number(b.champion_cost)
        );
      }
    });
    setUnfilterCharacter(() => {
      if (characterFilter.type === "abc") {
        return championsData.sort((a, b) =>
          a.champion_name.localeCompare(b.champion_name)
        );
      }
      if (characterFilter.type === "cost") {
        return championsData.sort(
          (a, b) => Number(a.champion_cost) - Number(b.champion_cost)
        );
      }
    });
  }, [characterFilter]);

  const [members, setMembers] = useState(teamcompsData[0].members);
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
  const [errorMessage, setErrorMessage] = useState("");
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
      console.log(uniqueSys);
      switch (item) {
        case "Lagoon Emblem":
          !uniqueSys.includes("lagoon") && uniqueSys.push("lagoon");
          break;
        case "Dragonmancer Emblem":
          !uniqueSys.includes("dragonmancer") && uniqueSys.push("dragonmancer");
          break;
        case "Mage Emblem":
          !uniqueSys.includes("mage") && uniqueSys.push("mage");
          break;
        case "Shimmerscale Emblem":
          !uniqueSys.includes("shimmerscale") && uniqueSys.push("shimmerscale");
          break;
        case "Swiftshot Emblem":
          !uniqueSys.includes("swiftshot") && uniqueSys.push("swiftshot");
          break;
        case "Cavalier Emblem":
          !uniqueSys.includes("cavalier") && uniqueSys.push("cavalier");
          break;
        case "Mirage Emblem":
          !uniqueSys.includes("mirage") && uniqueSys.push("mirage");
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
      all.forEach((c) => {
        if (!championUnique.find((i) => i?.champion_name === c.champion_name)) {
          championUnique.push(c);
        }
      });
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
            if (item === "lagoon") count = count + 1;
            break;
          case "Dragonmancer Emblem":
            if (item === "dragonmancer") count = count + 1;
            break;
          case "Mage Emblem":
            if (item === "mage") count = count + 1;
            break;
          case "Shimmerscale Emblem":
            if (item === "shimmerscale") count = count + 1;
            break;
          case "Swiftshot Emblem":
            if (item === "swiftshot") count = count + 1;
            break;
          case "Cavalier Emblem":
            if (item === "cavalier") count = count + 1;
            break;
          case "Mirage Emblem":
            if (item === "mirage") count = count + 1;
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
  useEffect(() => {
    if (errorMessage !== "") {
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  }, [errorMessage]);

  function createElementsFromNumber(n) {
    var elements = [];
    for (let i = 0; i < n; i++) {
      elements.push(
        <Suspense key={i}>
          <HexagonTeamBuilder
            hanle_change_level={hanleChangeLevel}
            data={getHexagonData(i + 1)}
            position={i + 1}
            className="team-builder-drag-item"
            hanle_on_drop={ondrop}
          />
        </Suspense>
      );
    }
    return elements;
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
        setMembers((pre) => {
          let r = pre.find((m) => Number(m.position) === position);
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
          let a = pre.find((m) => Number(m.position) === position);
          if (a.items.length < 3) {
            let is_unique = itemsData.find(
              (i) => i.item_name === item_name
            ).is_unique_item;
            if (is_unique === "false") {
              a.items.push(item_name);
            } else {
              if (a.items.includes(item_name)) {
                setErrorMessage("Only one of these items can be equipped.");
              } else {
                a.items.push(item_name);
              }
            }
          } else {
            setErrorMessage("A champion can only have 3 items equipped.");
          }
          return [...pre];
        });
      }
    }
    if (e.dataTransfer.getData("drag_from_position")) {
      let old_position = Number(e.dataTransfer.getData("drag_from_position"));
      if (is_empty) {
        setMembers((pre) => {
          pre.find((m) => Number(m.position) === old_position).position =
            position;
          return [...pre];
        });
      } else {
        setMembers((pre) => {
          const newIndex = pre.findIndex(
            (e) => Number(e.position) === position
          );
          const oldIndex = pre.findIndex(
            (e) => Number(e.position) === old_position
          );
          pre[newIndex].position = old_position;
          pre[oldIndex].position = position;
          return [...pre];
        });
      }
    }
  }
  function hanleOnDropTableChampions(e) {
    let position = Number(e.dataTransfer.getData("drag_from_position"));
    if (position) {
      setMembers((pre) => {
        pre.splice(
          pre.findIndex((i) => Number(i.position) === position),
          1
        );
        return [...pre];
      });
    }
  }
  function hanleOnDropTableItems(e) {
    let item_index = e.dataTransfer.getData("drag_item_index");
    let item_position = Number(e.dataTransfer.getData("drag_item_position"));
    if (item_index && item_position) {
      setMembers((pre) => {
        pre
          .find((p) => Number(p.position) === item_position)
          .items.splice(item_index, 1);
        return [...pre];
      });
    }
  }
  function getCharacterClass(champion_name) {
    let result = characterData.find((c) => c.champion_name === champion_name);
    if (result) return "team-builder-drag-champion-wrapper";
    return "team-builder-drag-champion-wrapper hidden";
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
          <div
            onClick={() => setShowPartialTraits((pre) => !pre)}
            className="team-builder-title-filter-partial-traits"
          >
            <span>Show Partial Traits</span>
          </div>
          <div
            onClick={() => setMembers([])}
            className="team-builder-title-filter-clear-team"
          >
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
                  (item.bonus_level > 0 || showPartialTraits) && (
                    <PartialTraitsItem
                      key={item.name}
                      lvls={item.lvls}
                      width="20px"
                      height="20px"
                      count={item.count}
                      hide_name={true}
                      synergy_name={item.name}
                      bonus_level={item.bonus_level}
                    />
                  )
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
            {errorMessage && <div className="error">{errorMessage}</div>}
            <div className="team-builder-drag-line-2">
              <div className="team-builder-drag-champions">
                <SearchCard
                  filter={
                    <Fragment>
                      <div
                        onClick={() =>
                          setCharacterFilter({
                            ...characterFilter,
                            type: "abc",
                          })
                        }
                        className={
                          characterFilter.type === "abc"
                            ? "filter active"
                            : "filter"
                        }
                      >
                        <span>A-Z</span>
                      </div>
                      <div
                        onClick={() =>
                          setCharacterFilter({
                            ...characterFilter,
                            type: "cost",
                          })
                        }
                        className={
                          characterFilter.type === "cost"
                            ? "filter active"
                            : "filter"
                        }
                      >
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
                  hanle_on_drop={hanleOnDropTableChampions}
                  placeholder="Search by name, trait, or cost..."
                >
                  {unfilterCharacter.map((c) => {
                    return (
                      <div
                        key={c.champion_name}
                        className={getCharacterClass(c.champion_name)}
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
                <SearchCard
                  placeholder="Search by name..."
                  hanle_on_drop={hanleOnDropTableItems}
                >
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
  .error {
    text-align: center;
    margin-left: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    padding: 5px 10px;
    color: #e23f3f;
    background: rgba(226, 63, 63, 0.25);
  }
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
        cursor: pointer;
      }
      .team-builder-title-filter-clear-team,
      .team-builder-title-filter-share {
        button {
          transition: all 0.3s;
          cursor: pointer;
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
          &:hover {
            border-color: #d47559;
          }
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
            margin-bottom: 50px;
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
            padding-right: 20px;
            .team-builder-drag-champion-wrapper {
              padding: 5px 10px;
            }
            .hidden {
              .avatar-champion {
                opacity: 0.15;
              }
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
