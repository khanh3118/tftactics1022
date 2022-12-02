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
import { useEffect, useState, useCallback } from "react";

export default function Champions() {
  const { championsData, synergysData } = useContext(DataContext);
  const [filter, setFilter] = useState({
    search_text: "",
    costs: [],
    classes: [],
    origins: [],
  });
  const [filteredData, setFilteredData] = useState(championsData);

  function hanleSeach(searchText) {
    setFilter((pre) => {
      return {
        ...pre,
        search_text: searchText,
      };
    });
  }

  useEffect(() => {
    setFilteredData([
      ...championsData
        .filter((f) => {
          if (
            f.champion_name
              .toLowerCase()
              .includes(filter.search_text.toLowerCase().trim())
          )
            return true;
          if (f.champion_class.find((l) => l.includes(filter.search_text)))
            return true;
          if (f.champion_origin.find((l) => l.includes(filter.search_text)))
            return true;
          return false;
        })
        .filter(
          (c) =>
            filter.costs.length === 0 ||
            filter.costs.includes(Number(c.champion_cost))
        )
        .filter((i) => {
          let result = false;
          filter.classes.forEach((e) => {
            if (i.champion_class.includes(e.toLowerCase())) result = true;
          });
          return filter.classes.length === 0 || result;
        })
        .filter((i) => {
          let result = false;
          filter.origins.forEach((e) => {
            if (i.champion_origin.includes(e.toLowerCase())) result = true;
          });
          return filter.origins.length === 0 || result;
        }),
    ]);
  }, [championsData, filter]);

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

  const addAndRemoveCost = useCallback((cost) => {
    setFilter((pre) => {
      if (pre.costs.includes(cost)) {
        let position = pre.costs.indexOf(cost);
        pre.costs.splice(position, 1);
      } else {
        pre.costs.push(cost);
      }
      return { ...pre };
    });
  }, []);

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

  const resetFilter = useCallback(() => {
    setFilter({
      search_text: "",
      costs: [],
      classes: [],
      origins: [],
    });
  }, []);

  const removeCostFilter = useCallback((cost) => {
    setFilter((pre) => {
      pre.costs.splice(pre.costs.indexOf(cost), 1);
      return { ...pre };
    });
  }, []);

  const removeOriginFilter = useCallback((originName) => {
    setFilter((pre) => {
      pre.origins.splice(pre.origins.indexOf(originName), 1);
      return { ...pre };
    });
  }, []);

  const removeClassFilter = useCallback((className) => {
    setFilter((pre) => {
      pre.classes.splice(pre.classes.indexOf(className), 1);
      return { ...pre };
    });
  }, []);

  return (
    <ChampionsWrapper>
      <MainLayout
        sideContent={
          <ChampionsSideContent>
            <div className="champions-side-title">
              <span className="title-name">Filter</span>
              <button onClick={() => resetFilter()}>Reset</button>
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
                minWidth="300px"
                reverse={true}
                placeholder="Search by name, origin, or class..."
                className="search"
                hanleSearch={hanleSeach}
              />
            </div>
          </Title>
        }
        mainContent={
          <ChampionsMainContent>
            <div className="champions-filter">
              {filter.costs.map((c) => {
                return (
                  <div
                    onClick={() => removeCostFilter(c)}
                    key={c}
                    className="champions-filter-item"
                  >
                    <span>{c}</span>
                    <FontAwesomeIcon className="coin" icon={solid("xmark")} />
                  </div>
                );
              })}
              {filter.origins.map((o) => {
                return (
                  <div
                    onClick={() => removeOriginFilter(o)}
                    key={o}
                    className="champions-filter-item"
                  >
                    <span>{o}</span>
                    <FontAwesomeIcon className="coin" icon={solid("xmark")} />
                  </div>
                );
              })}
              {filter.classes.map((f) => {
                return (
                  <div
                    onClick={() => removeClassFilter(f)}
                    key={f}
                    className="champions-filter-item"
                  >
                    <span>{f}</span>
                    <FontAwesomeIcon className="coin" icon={solid("xmark")} />
                  </div>
                );
              })}
            </div>
            <div className="champions-wrapper">
              {filteredData.map((c) => {
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
  .champions-filter {
    display: grid;
    grid-template-columns: repeat(4, 25%);
    .champions-filter-item {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #d47559;
      padding: 6px 13px;
      border-radius: 4px;
      margin: 0 5px 10px;
      &:hover {
        background-color: #de9782;
      }
      span {
      }
      svg {
      }
    }
  }
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
  @media (max-width: 1024px) {
    padding-top: 20px;
    .champions-filter {
      display: grid;
      grid-template-columns: repeat(4, 25%);
      .champions-filter-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #d47559;
        padding: 6px 13px;
        border-radius: 4px;
        margin: 0 5px 10px;
        &:hover {
          background-color: #de9782;
        }
        span {
        }
        svg {
        }
      }
    }
    .champions-wrapper {
      display: grid;
      grid-template-columns: repeat(6, 16.6666666667%);
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
    }
  }
  @media (max-width: 1024px) {
    flex-wrap: wrap;
    .title-1 {
      width: 100%;
      justify-content: space-between;
      margin-bottom: 10px;
      .name {
        margin-right: 0;
      }
    }
    .title-2 {
      width: 100%;
      .search {
        border-radius: 0%;
      }
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
      cursor: pointer;
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
