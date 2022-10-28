import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styled from "styled-components";

function ChampionsStats() {
  function hanleClick(e) {
    let a = document.querySelectorAll(".table-header-item");
    a.forEach((item) => {
      item.className = "table-header-item";
    });
    e.target.className = "table-header-item active";
    console.log(e.target.innerText);
  }
  function hanleLevel(e, level) {
    let svgs = document.querySelectorAll("#champions-stats .level svg");
    svgs.forEach((item) => {
      item.style.color = "white";
    });
    for (let i = 0; i < level; i++) {
      svgs[i].style.color = "orange";
    }
  }
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
          <div className="btn">
            <span>offense</span>
          </div>
          <div className="btn">
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
            <div onClick={(e) => hanleClick(e)} className="table-header-item">
              DPS
            </div>
            <div onClick={(e) => hanleClick(e)} className="table-header-item">
              Atk Spd
            </div>
            <div onClick={(e) => hanleClick(e)} className="table-header-item">
              Damage
            </div>
            <div onClick={(e) => hanleClick(e)} className="table-header-item">
              Range
            </div>
          </div>
          <div className="table-items">
            <div className="table-item">
              <div className="item-name-img">
                <img
                  src="https://rerollcdn.com/characters/Skin/7.5/Shyvana.png"
                  alt="Shyvana"
                />
                <span>Shyvana</span>
              </div>
              <div className="item-stats">
                <span>48</span>
              </div>
              <div className="item-stats">
                <span>0.8</span>
              </div>
              <div className="item-stats">
                <span>60</span>
              </div>
              <div className="item-stats">
                <span>4</span>
              </div>
            </div>
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
        grid-template-columns: repeat(5, 1fr);
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
        }
        .table-header-item.active {
          box-shadow: inset 0 2px 0 0 #d47559;
        }
      }
      .table-items {
        .table-item {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
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
          }
          .item-name-img {
            padding-left: 20px;
            img {
              vertical-align: middle;
              width: 40px;
              height: 40px;
              margin-right: 10px;
              border: 1px solid #fff;
              border-image: linear-gradient(
                to bottom right,
                #b89d27 0,
                #fff 25%,
                #b89d27 50%,
                #fff 75%,
                #b89d27
              );
              border-image-slice: 1;
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
