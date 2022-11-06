import styled from "styled-components";
import SelectDropdown from "components/common/SelectDropdown";
import HexagonTeamBuilder from "components/common/HexagonTeamBuilder";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "contexts/DataContext";
import PartialTraitsItem from "components/common/PartialTraitsItem";

export default function TeamBuilder(pros) {
  const { championsData, synergysData } = useContext(DataContext);
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
  function getPartialTraits() {
    // merge member list and championdata
    let all = members.map((member) => {
      let championDetail = championsData.find(
        (c) => c.champion_name === member.name
      );
      return {
        ...member,
        ...championDetail,
      };
    });
    // get all item
    let allItem = all.reduce((total, current) => {
      return total.concat(current.items);
    }, []);
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
        .find((s) => s.synergy_name.toLowerCase() === item)
        ?.synergy_description_level.split("/")
        .forEach((i, index) => {
          if (index === 0) {
            lvls.push(i.split("$")[0]);
          } else {
            lvls.push(i.split("$")[0].split("\n")[1]);
          }
        });
      // count synergy from champion
      all.forEach((a) => {
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
    return data;
  }
  const [partialTraits, setPartialTraits] = useState(getPartialTraits());

  useEffect(() => {
    setPartialTraits([...getPartialTraits()]);
  }, [members]);

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
        <HexagonTeamBuilder
          hanle_change_level={hanleChangeLevel}
          data={getHexagonData(i + 1)}
          key={i + 1}
          className="team-builder-1-drag-item"
        />
      );
    }
    return elements;
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
      <div className="team-builder">
        <div className="team-builder-1">
          <div className="team-builder-1-synergy">
            {partialTraits.map((item) => {
              return (
                item.bonus_level > 0 && (
                  <PartialTraitsItem
                    width="20px"
                    height="20px"
                    count={item.count}
                    hide_name={true}
                    synergy_name={item.name}
                    bonus_level={item.bonus_level}
                    key={item.name}
                  />
                )
              );
            })}
          </div>
          <div className="team-builder-1-drag">
            {createElementsFromNumber(28)}
          </div>
          <div className="team-builder-1-recipe">
            <div className="team-builder-1-recipe-base">
              <div className="team-builder-1-recipe-base-item"></div>
            </div>
            <div className="team-builder-1-recipe-combine">
              <div className="team-builder-1-recipe-combine-item">hhe</div>
            </div>
          </div>
        </div>
      </div>
    </TeamBuilderWrapper>
  );
}

const TeamBuilderWrapper = styled.div`
  color: white;
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
  .team-builder {
    padding-top: 30px;
    .team-builder-1 {
      display: grid;
      grid-template-columns: 200px 700px auto;
      .team-builder-1-synergy {
      }
      .team-builder-1-drag {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        .team-builder-1-drag-item {
          &:nth-child(8),
          &:nth-child(22) {
            margin-left: 88px;
          }
        }
      }
      .team-builder-1-recipe {
        .team-builder-1-recipe-base {
          .team-builder-1-recipe-base-item {
          }
        }
        .team-builder-1-recipe-combine {
          .team-builder-1-recipe-combine-item {
          }
        }
      }
    }
  }
`;
