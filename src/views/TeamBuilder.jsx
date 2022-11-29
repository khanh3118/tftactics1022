import styled from "styled-components";
import {
  useContext,
  useState,
  useEffect,
  Fragment,
  Suspense,
  lazy,
  useMemo,
  useCallback,
} from "react";
import { useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import SelectDropdown from "components/common/SelectDropdown";
import ItemInfo from "components/info/ItemInfo";
import SearchCard from "components/common/SearchCard";
import Switch from "components/common/Switch";
import HexagonTeamBuilder from "components/common/HexagonTeamBuilder";
import { DataContext } from "contexts/DataContext";
import TeamBuilderServices from "services/teambuilder";
import { capitalize, getTraitsBonus } from "utils/filter";

const PartialTraitsItem = lazy(() =>
  import("components/common/PartialTraitsItem")
);
const CharacterInfo = lazy(() => import("components/info/CharacterInfo"));

export async function loader({ params }) {
  return TeamBuilderServices.getTeamById(params.teamId);
}

export default function TeamBuilder() {
  // get team data from share link
  const teamData = useLoaderData();

  // data from context
  const { championsData, synergysData, itemsData } = useContext(DataContext);

  // hanle show partial traits
  const [showPartialTraits, setShowPartialTraits] = useState(true);

  // hanle search and filter character
  const [characterFilter, setCharacterFilter] = useState({
    text: "",
    type: "abc",
  });
  const [characterData, setCharacterData] = useState(
    championsData.sort((a, b) => a.champion_name.localeCompare(b.champion_name))
  );
  const [unfilterCharacter, setUnfilterCharacter] = useState(
    championsData.sort((a, b) => a.champion_name.localeCompare(b.champion_name))
  );
  useEffect(() => {
    setCharacterData((pre) => {
      let data = championsData.filter((c) => {
        if (c.champion_name.toLowerCase().includes(characterFilter.text))
          return true;
        if (c.champion_origin.find((o) => o.includes(characterFilter.text)))
          return true;
        if (c.champion_class.find((c) => c.includes(characterFilter.text)))
          return true;
        if (c.champion_cost === characterFilter.text) return true;
        return false;
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
  }, [championsData, characterFilter]);

  // hanle search items
  const [itemfilter, setItemfilter] = useState("");
  function searchCharacter(searchText) {
    setCharacterFilter((pre) => {
      return {
        ...pre,
        text: searchText,
      };
    });
  }
  function searchItem(searchText) {
    setItemfilter(searchText);
  }
  const [fitleredItems, setFitleredItems] = useState(itemsData);
  useEffect(() => {
    setFitleredItems((pre) => {
      let data = itemsData.filter((i) =>
        i.item_name.toLowerCase().includes(itemfilter)
      );
      return data;
    });
  }, [itemfilter, itemsData]);

  // hanle error message
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (errorMessage !== "") {
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  }, [errorMessage]);

  // team members
  const [members, setMembers] = useState(teamData || []);

  // hanle share
  const [shared, setShared] = useState(false);
  const hanleShare = useCallback(async () => {
    if (!shared && members.length > 0) {
      let id = await TeamBuilderServices.saveTeam(members);
      navigator.clipboard.writeText(
        `${window.location.origin}/teambuilder/${id}`
      );
      setShared(true);
    }
  }, [members, shared]);
  useEffect(() => {
    if (members.length > 0) {
      setShared(false);
    }
  }, [members]);

  // merge member and championsData
  const newMembers = useMemo(() => {
    return members?.map((member) => {
      let championDetail = championsData.find(
        (c) => c.champion_name === member.name
      );
      return {
        ...member,
        ...championDetail,
      };
    });
  }, [championsData, members]);

  /// all items
  const allItem = useMemo(() => {
    return newMembers.reduce((total, current) => {
      return total.concat(current.items);
    }, []);
  }, [newMembers]);

  // allitem but not contain trait item can not craft
  const allItemCraftable = useMemo(() => {
    return allItem.filter((a) => {
      let c = itemsData.find((i) => i.item_name === a);
      if (c.is_trait && c.is_combined === "false") return false;
      return true;
    });
  }, [allItem, itemsData]);

  /// all item recipes
  const allRecipe = useMemo(() => {
    return allItemCraftable.reduce((all, curr) => {
      let a = itemsData.find((i) => i.item_name === curr);
      return all.concat(a.recipe_1).concat(a.recipe_2);
    }, []);
  }, [allItemCraftable, itemsData]);

  // unique traits
  const uniqueTraits = useMemo(() => {
    return [
      ...new Set(
        newMembers.reduce((total, current) => {
          return total
            .concat(current.champion_origin)
            .concat(current.champion_class);
        }, [])
      ),
    ];
  }, [newMembers]);

  // hanle traits bonus
  const traits = useMemo(() => {
    let data = getTraitsBonus(allItem, uniqueTraits, synergysData, newMembers);

    return data.sort(
      (a, b) =>
        b.bonus_level - a.bonus_level ||
        b.count - a.count ||
        a.name.localeCompare(b.name)
    );
  }, [allItem, uniqueTraits, synergysData, newMembers]);

  // prepare data for each slot in board
  function getHexagonData(position) {
    let result = members.find((member) => Number(member.position) === position);
    result = {
      ...result,
      cost: championsData.find((c) => c.champion_name === result?.name)
        ?.champion_cost,
    };
    return result;
  }

  // hanle change level member
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
        <HexagonTeamBuilder
          key={i}
          hanle_change_level={hanleChangeLevel}
          data={getHexagonData(i + 1)}
          position={i + 1}
          className="team-builder-drag-item"
          hanle_on_drop={ondrop}
        />
      );
    }
    return elements;
  }
  // hanle ondrop in slot
  function ondrop(e, position, is_empty) {
    // drag from characters table
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
    // drag from items table
    if (e.dataTransfer.getData("item_name")) {
      let item_name = e.dataTransfer.getData("item_name");
      if (is_empty === false) {
        setMembers((pre) => {
          let member = pre.find((m) => Number(m.position) === position);
          let championDetail = championsData.find(
            (c) => c.champion_name === member.name
          );
          if (member.items.length < 3) {
            let itemDetail = itemsData.find((i) => i.item_name === item_name);
            if (itemDetail.is_unique_item === "true") {
              if (member.items.includes(item_name)) {
                setErrorMessage("Only one of these items can be equipped.");
              } else if (
                championDetail.champion_class.includes(
                  itemDetail?.trait_name
                ) ||
                championDetail.champion_origin.includes(itemDetail?.trait_name)
              ) {
                setErrorMessage(
                  `${championDetail.champion_name} is already a ${capitalize(
                    itemDetail.trait_name
                  )}.`
                );
              } else {
                member.items.push(item_name);
              }
            } else {
              member.items.push(item_name);
            }
          } else {
            setErrorMessage("A champion can only have 3 items equipped.");
          }
          return [...pre];
        });
      }
    }
    // drag from slot
    if (e.dataTransfer.getData("drag_from_position")) {
      let old_position = Number(e.dataTransfer.getData("drag_from_position"));
      if (is_empty) {
        // move character
        setMembers((pre) => {
          pre.find((m) => Number(m.position) === old_position).position =
            position;
          return [...pre];
        });
      } else {
        // swap position
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
  function getItemClass(item_name) {
    let result = fitleredItems.find((i) => i.item_name === item_name);
    if (result) return "team-builder-drag-item-wrapper";
    return "team-builder-drag-item-wrapper hidden";
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
            <Switch active={showPartialTraits} />
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
            <button onClick={() => hanleShare()}>
              {shared ? <span>LINK COPIED!</span> : <span>SHARE</span>}
            </button>
          </div>
        </div>
      </div>
      <div className="team-builder-wrapper">
        <div className="team-builder">
          <div className="team-builder-synergy">
            <Suspense>
              {traits.map((item) => {
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
              {traits.length === 0 && (
                <div className="team-builder-synergy-empty">
                  <FontAwesomeIcon
                    size="lg"
                    icon={solid("circle-exclamation")}
                  />
                  <span>No active synergies</span>
                </div>
              )}
            </Suspense>
          </div>
          <div className="team-builder-drag">
            <div className="team-builder-drag-line-1">
              <div className="team-builder-drag-field">
                {createElementsFromNumber(28)}
              </div>
              <div className="team-builder-drag-recipe">
                {allItem.length === 0 && (
                  <div className="team-builder-drag-recipe-empty">
                    <FontAwesomeIcon
                      size="lg"
                      icon={solid("circle-exclamation")}
                    />
                    <span>No equipped items</span>
                  </div>
                )}
                {allRecipe.length > 0 && (
                  <div className="team-builder-drag-recipe-item">
                    {allRecipe.map((a, index) => {
                      return (
                        <ItemInfo
                          disableRedirect={true}
                          draggable={false}
                          key={a + index}
                          className="team-builder-drag-recipe-item-a"
                          width="27px"
                          height="27px"
                          item_name={a}
                        />
                      );
                    })}
                  </div>
                )}
                {allItemCraftable.map((i, index) => {
                  return (
                    <div
                      key={i + index}
                      className="team-builder-drag-recipe-item"
                    >
                      <span>
                        <ItemInfo
                          disableRedirect={true}
                          draggable={false}
                          width="30px"
                          height="30px"
                          item_name={i}
                        />
                      </span>
                      <span>
                        <FontAwesomeIcon icon={solid("equals")} />
                      </span>
                      <span>
                        <ItemInfo
                          disableRedirect={true}
                          draggable={false}
                          width="24px"
                          height="24px"
                          item_name={
                            itemsData.find((d) => d.item_name === i).recipe_1
                          }
                        />
                      </span>
                      <span>
                        <ItemInfo
                          disableRedirect={true}
                          width="24px"
                          height="24px"
                          draggable={false}
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
                            disableRedirect={true}
                            champion_name={c.champion_name}
                            width="42px"
                            height="42px"
                            rightPopup={true}
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
                  hanle_search={searchItem}
                >
                  {itemsData
                    .filter((i) => i.is_combined === "true" || i.is_trait)
                    .sort(
                      (a, b) =>
                        (a.is_trait === b.is_trait ? 0 : a.is_trait ? -1 : 1) ||
                        a.item_name.localeCompare(b.item_name)
                    )
                    .map((i, index) => {
                      return (
                        <div
                          key={i.item_name + index}
                          className={getItemClass(i.item_name)}
                        >
                          <ItemInfo
                            disableRedirect={true}
                            draggable={true}
                            popupPosition="left"
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
        display: flex;
        cursor: pointer;
        align-items: center;
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
    .team-builder-synergy-empty,
    .team-builder-drag-recipe-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #102531;
      border: 1px solid #17313a;
      padding: 20px;
      span {
        color: #88a0a7;
        font-size: 15px;
      }
      svg {
        color: #88a0a7;
        margin-bottom: 10px;
      }
    }
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
            .team-builder-drag-item-wrapper.hidden {
              opacity: 0.15;
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
