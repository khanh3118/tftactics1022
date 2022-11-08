import styled from "styled-components";
import MainLayout from "layouts/MainLayout";
import SelectDropDown from "components/common/SelectDropdown";
import SearchOrigin from "components/common/SearchOrigin";
import { DataContext } from "contexts/DataContext";
import { useContext } from "react";
import CharacterInfo from "components/info/CharacterInfo";
import SelectSide from "components/common/SelectSide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState, useEffect } from "react";

export default function Champions() {
  const { championsData, synergysData } = useContext(DataContext);
  const [filter, setFilter] = useState({
    search_text: "",
    costs: [],
    traits: [],
  });
  function addAndRemoveTrait(traitName) {
    setFilter((pre) => {
      if (pre.traits.includes(traitName)) {
        let position = pre.traits.indexOf(traitName);
        pre.traits.splice(position, 1);
      } else {
        pre.traits.push(traitName);
      }
      return { ...pre };
    });
  }
  function addAndRemoveCost(cost) {
    setFilter((pre) => {
      if (pre.costs.includes(cost)) {
        let position = pre.costs.indexOf(cost);
        pre.costs.splice(position, 1);
      } else {
        pre.costs.push(cost);
      }
      return { ...pre };
    });
  }

  function createElementsFromNumber(n) {
    var elements = [];
    for (let i = 0; i < n; i++) {
      elements.push(
        <li
          key={i}
          onClick={() => addAndRemoveCost(i + 1)}
          className={filter.costs.includes(i + 1) ? "active" : ""}
        >
          <FontAwesomeIcon className="coin" icon={solid("coins")} />
          {i + 1}
          <span className="check"></span>
        </li>
      );
    }
    return elements;
  }

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  return (
    <ChampionsWrapper>
      <MainLayout
        sideContent={
          <ChampionsSideContent>
            <div className="champions-side-title">
              <span className="title-name">Filter</span>
              <button>Reset</button>
            </div>
            <SelectSide count={8} name="Cost">
              {createElementsFromNumber(8)}
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
                      onClick={() => addAndRemoveTrait(i.synergy_name)}
                      key={i.synergy_name}
                      className={
                        filter.traits.includes(i.synergy_name) ? "active" : ""
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
                      onClick={() => addAndRemoveTrait(i.synergy_name)}
                      key={i.synergy_name}
                      className={
                        filter.traits.includes(i.synergy_name) ? "active" : ""
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
          </ChampionsSideContent>
        }
        titleContent={
          <Title className="title">
            <div className="title-1">
              <div className="name">TFT Champions List</div>
              <SelectDropDown
                dropDownItems={[{ text: "Set 7.5", isSelected: true }]}
                placeholder="Set 7.5"
                className="dropdown"
              />
            </div>
            <div className="title-2">
              <SearchOrigin
                placeholder="Search by name, origin, or class..."
                className="search"
              />
            </div>
          </Title>
        }
        mainContent={
          <ChampionsMainContent>
            <div className="champions-wrapper">
              {championsData.map((c) => {
                return (
                  <div key={c.champion_name} className="champions-item">
                    <CharacterInfo
                      width="55px"
                      height="55px"
                      champion_name={c.champion_name}
                      className="champions-item-img"
                    />
                    <span>{c.champion_name}</span>
                  </div>
                );
              })}
            </div>
          </ChampionsMainContent>
        }
      />
    </ChampionsWrapper>
  );
}

const ChampionsWrapper = styled.div`
  .content {
    padding-left: 30px;
  }
`;

const ChampionsMainContent = styled.div`
  padding-top: 20px;
  .champions-wrapper {
    display: grid;
    grid-template-columns: repeat(8, 12.5%);
    .champions-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 8px 15px;
      .champions-item-img {
        margin-bottom: 3px;
      }
      span {
        color: #88a0a7;
        font-size: 14px;
        text-align: center;
      }
    }
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

const ChampionsSideContent = styled.div`
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
      background-color: transparent;
      border: 1px solid #17313a;
      padding: 5px 20px;
      border-radius: 3px;
    }
  }
  .cost {
    transition: all 0.3s;
    height: 36px;
    overflow: hidden;
    margin-top: 10px;
    ul {
      list-style: none;
      li {
        cursor: pointer;
        font-size: 15px;
        color: white;
        padding: 7.5px 0;
        display: flex;
        align-items: center;
        .coin {
          transition: all 0.3s;
          color: hsla(0, 0%, 100%, 0.25);
          margin-right: 10px;
        }
        .check {
          transition: all 0.3s;
          margin-left: auto;
          display: inline-block;
          width: 12px;
          height: 12px;
          background-color: transparent;
          border-radius: 50%;
          border: 2px solid hsla(0, 0%, 100%, 0.25);
        }
        &:hover {
          .coin {
            color: white;
          }
          .check {
            border-color: white;
          }
        }
      }
      li.active {
        .coin {
          color: white;
        }
        .check {
          border: 2px solid #227aad;
          background: #227aad;
        }
      }
    }
  }
`;
