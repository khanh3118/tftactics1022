import { useEffect, lazy, Suspense, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styled from "styled-components";
import { useContext, useState } from "react";
import { DataContext } from "contexts/DataContext";
import { useOutletContext } from "react-router-dom";

const CharacterInfo = lazy(() => import("components/info/CharacterInfo"));

function ChampionsStats() {
  const searchText = useOutletContext();
  const [level, setLevel] = useState(1);
  const [decreased, setDecreased] = useState(true);
  const [type, setType] = useState("offense");
  const { championsData } = useContext(DataContext);
  const [sorted, setSorted] = useState(championsData);
  const [filterOptions, setFilterOptions] = useState({
    name: "DPS",
    type: "decrease",
    searchText: "",
  });
  useEffect(() => {
    setSorted([
      ...championsData
        .filter((item) =>
          item.champion_name.toLowerCase().includes(filterOptions.searchText)
        )
        .sort((a, b) => {
          if (filterOptions.type === "increase") {
            if (filterOptions.name === "DPS")
              return (
                Number(a.champion_dps.split("/")[level - 1].trim()) -
                Number(b.champion_dps.split("/")[level - 1].trim())
              );
            if (filterOptions.name === "Damage")
              return (
                Number(a.champion_damage.split("/")[level - 1]) -
                Number(b.champion_damage.split("/")[level - 1])
              );
            if (filterOptions.name === "Range")
              return Number(a.champion_range) - Number(b.champion_range);
            if (filterOptions.name === "Atk Spd")
              return Number(a.champion_akt_spd) - Number(b.champion_akt_spd);
            if (filterOptions.name === "Health")
              return (
                Number(a.champion_health.split("/")[level - 1].trim()) -
                Number(b.champion_health.split("/")[level - 1].trim())
              );
            if (filterOptions.name === "Mana")
              return Number(a.champion_mana) - Number(b.champion_mana);
            if (filterOptions.name === "Armor")
              return Number(a.champion_armor) - Number(b.champion_armor);
            if (filterOptions.name === "MR")
              return Number(a.champion_mr) - Number(b.champion_mr);
            if (filterOptions.name === "Champion")
              return a.champion_name.localeCompare(b.champion_name);
          }
          if (filterOptions.type === "decrease") {
            if (filterOptions.name === "DPS")
              return (
                b.champion_dps.split("/")[level - 1].trim() -
                Number(a.champion_dps.split("/")[level - 1].trim())
              );
            if (filterOptions.name === "Damage")
              return (
                Number(b.champion_damage.split("/")[level - 1].trim()) -
                a.champion_damage.split("/")[level - 1].trim()
              );
            if (filterOptions.name === "Range")
              return Number(b.champion_range) - a.champion_range;
            if (filterOptions.name === "Atk Spd")
              return Number(b.champion_akt_spd) - Number(a.champion_akt_spd);
            if (filterOptions.name === "Health")
              return (
                Number(b.champion_health.split("/")[level - 1].trim()) -
                Number(a.champion_health.split("/")[level - 1].trim())
              );
            if (filterOptions.name === "Mana")
              return Number(b.champion_mana) - Number(a.champion_mana);
            if (filterOptions.name === "Armor")
              return Number(b.champion_armor) - Number(a.champion_armor);
            if (filterOptions.name === "MR")
              return Number(b.champion_mr) - Number(a.champion_mr);
            if (filterOptions.name === "Champion")
              return b.champion_name.localeCompare(a.champion_name);
          }
          return false;
        }),
    ]);
  }, [championsData, filterOptions, level]);

  useEffect(() => {
    setFilterOptions({
      ...filterOptions,
      searchText,
    });
  }, [searchText]);

  const hanleClick = useCallback(
    (e) => {
      let a = document.querySelectorAll(".table-header-item");
      a.forEach((item) => {
        item.className = "table-header-item";
      });
      e.target.className = "table-header-item increase";
      setDecreased(false);
      setFilterOptions({
        ...filterOptions,
        type: "increase",
        name: e.target.innerText,
      });
      if (filterOptions.name === e.target.innerText) {
        setDecreased((pre) => !pre);
        if (decreased) {
          e.target.className = "table-header-item increase";
          setDecreased(false);
          setFilterOptions({
            ...filterOptions,
            type: "increase",
            name: e.target.innerText,
          });
        } else {
          e.target.className = "table-header-item decrease";
          setDecreased(true);
          setFilterOptions({
            ...filterOptions,
            type: "decrease",
            name: e.target.innerText,
          });
        }
      }
    },
    [decreased, filterOptions]
  );

  const hanleLevel = useCallback((e, level) => {
    let svgs = document.querySelectorAll("#champions-stats .level svg");
    svgs.forEach((item) => {
      item.style.color = "white";
    });
    for (let i = 0; i < level; i++) {
      svgs[i].style.color = "orange";
    }
    setLevel(level);
  }, []);

  const offenseSet = useCallback(() => {
    let a = document.querySelectorAll(".table-header-item");
    a.forEach((item) => {
      item.className = "table-header-item";
    });
    a[1].classList = "table-header-item decrease";
    setType("offense");
    setDecreased(true);
    setFilterOptions({
      ...filterOptions,
      type: "decrease",
      name: "DPS",
    });
  }, [filterOptions]);
  const defenseSet = useCallback(() => {
    let a = document.querySelectorAll(".table-header-item");
    a.forEach((item) => {
      item.className = "table-header-item";
    });
    a[1].classList = "table-header-item decrease";
    setType("defense");
    setDecreased(true);
    setFilterOptions({
      ...filterOptions,
      type: "decrease",
      name: "Health",
    });
  }, [filterOptions]);
  return (
    <ChampionsStatsDefault id="champions-stats">
      <div className="wrapper">
        <div className="title">
          <p>
            Find a list of all the Champion stats in Teamfight Tactics including
            health, range, and dps.
          </p>
        </div>
        <div className="options">
          <div onClick={() => offenseSet()} className="btn">
            <span>offense</span>
          </div>
          <div onClick={() => defenseSet()} className="btn">
            <span>defense</span>
          </div>
          <div className="level">
            <FontAwesomeIcon
              onClick={(e) => hanleLevel(e, 1)}
              size="xl"
              icon={solid("star")}
            />
            <FontAwesomeIcon
              onClick={(e) => hanleLevel(e, 2)}
              size="xl"
              icon={solid("star")}
            />
            <FontAwesomeIcon
              onClick={(e) => hanleLevel(e, 3)}
              size="xl"
              icon={solid("star")}
            />
          </div>
        </div>
        <div className="table">
          <div className="table-header">
            <div onClick={(e) => hanleClick(e)} className="table-header-item">
              Champion
            </div>
            <div
              onClick={(e) => hanleClick(e)}
              className="table-header-item decrease"
            >
              {type === "offense" ? "DPS" : "Health"}
            </div>
            <div onClick={(e) => hanleClick(e)} className="table-header-item">
              {type === "offense" ? "Atk Spd" : "Mana"}
            </div>
            <div onClick={(e) => hanleClick(e)} className="table-header-item">
              {type === "offense" ? "Damage" : "Armor"}
            </div>
            <div onClick={(e) => hanleClick(e)} className="table-header-item">
              {type === "offense" ? "Range" : "MR"}
            </div>
          </div>
          <div className="table-items">
            {sorted.map((item) => {
              return (
                <div className="table-item" key={item.champion_name}>
                  <div className="item-name-img">
                    <Suspense>
                      <CharacterInfo
                        champion_name={item.champion_name}
                        width="40px"
                        height="40px"
                        className="item-name-img-l"
                      />
                    </Suspense>
                    <span className="item-name-image-span">
                      {item.champion_name}
                    </span>
                  </div>
                  <div className="item-stats">
                    {type === "offense" ? (
                      <span>
                        {item.champion_dps.split("/")[level - 1].trim()}
                      </span>
                    ) : (
                      <span>
                        {item.champion_health.split("/")[level - 1].trim()}
                      </span>
                    )}
                  </div>
                  <div className="item-stats">
                    {type === "offense" ? (
                      <span>{item.champion_akt_spd}</span>
                    ) : (
                      <span>{item.champion_mana}</span>
                    )}
                  </div>
                  <div className="item-stats">
                    {type === "offense" ? (
                      <span>
                        {item.champion_damage.split("/")[level - 1].trim()}
                      </span>
                    ) : (
                      <span>{item.champion_armor}</span>
                    )}
                  </div>
                  <div className="item-stats">
                    {type === "offense" ? (
                      <span>{item.champion_range}</span>
                    ) : (
                      <span>{item.champion_mr}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ChampionsStatsDefault>
  );
}

export default ChampionsStats;

const ChampionsStatsDefault = styled.div`
  .wrapper {
    .title {
      p {
        color: #88a0a7;
        font-size: 16px;
      }
      margin-bottom: 20px;
    }
    .options {
      display: flex;
      margin-bottom: 10px;
      align-items: center;
      .btn {
        transition: all 0.3s;
        cursor: pointer;
        padding: 11px 67px;
        background-color: #123040;
        width: min-content;
        &:hover {
          background-color: #1d4e68;
        }
        &:nth-child(1) {
          margin-right: 30px;
        }
        span {
          text-transform: uppercase;
          font-size: 12px;
          color: white;
          font-weight: 600;
        }
      }
      .level {
        margin-left: auto;
        height: 100%;
        svg {
          transition: all 0.3s;
          margin: 2px;
          cursor: pointer;
          &:nth-child(1) {
            color: orange;
          }
          &:hover {
            color: orange !important;
          }
        }
        svg.active {
          color: orange;
        }
      }
    }
    .table {
      .table-header {
        display: grid;
        grid-template-columns: 24% 19% 19% 19% 19%;
        border: 1px solid #17313a;
        text-align: right;
        .table-header-item {
          position: relative;
          cursor: pointer;
          padding: 10px;
          font-size: 14px;
          color: #88a0a7;
          font-weight: 600;
          &:nth-child(1) {
            text-align: left;
            padding-left: 20px;
          }
          &:nth-child(5) {
            padding-right: 20px;
          }
        }
        .table-header-item.increase {
          box-shadow: inset 0 2px 0 0 #d47559;
        }
        .table-header-item.decrease {
          box-shadow: inset 0 -2px 0 0 #d47559;
        }
      }
      .table-items {
        .table-item {
          display: grid;
          grid-template-columns: 24% 19% 19% 19% 19%;
          border-right: 1px solid #17313a;
          border-left: 1px solid #17313a;
          border-bottom: 1px solid #17313a;
          span {
            font-size: 15px;
            color: #6287a7;
            vertical-align: middle;
          }
          .item-name-img,
          .item-stats {
            display: flex;
            align-items: center;
            padding: 10px;
            &:nth-child(5) {
              padding-right: 20px;
            }
          }
          .item-name-img {
            width: max-content;
            padding-left: 20px;
            .item-name-image-span {
              margin-left: 15px;
            }
          }
          .item-stats {
            justify-content: flex-end;
          }
        }
      }
    }
  }
`;
