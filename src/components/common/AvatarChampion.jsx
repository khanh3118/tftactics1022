import styled from "styled-components";
import SynergyIcon from "./SynergyIcon";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AvatarChampion(props) {
  let borders = {
    1: "#213042",
    2: "#156831",
    3: "#12407c",
    4: "#893088",
    5: "#b89d27",
    6: "#12407c",
    7: "#fff",
    8: "#fff",
  };
  let borders_image = {
    6: "linear-gradient(to bottom right,#12407c 0,#fff 25%,#12407c 50%,#fff 75%,#12407c);",
    7: "linear-gradient(to bottom right,#893088 0,#fff 25%,#893088 50%,#fff 75%,#893088);",
    8: "linear-gradient(to bottom right,#b89d27 0,#fff 25%,#b89d27 50%,#fff 75%,#b89d27);",
  };
  return (
    <AvatarChampionDefault
      border_color={borders[props.cost]}
      border_image={borders_image[props.cost]}
      className={props.className}
      width={props.width}
      height={props.height}
    >
      <div className="wrapper">
        <img
          className="avatar-champion"
          src={props.img_src}
          alt={props.img_alt}
        />
        <div className="popup">
          <div className="popup-info">
            <div className="popup-avatar">
              <img src={props.img_src} alt="" />
              <span>{props.champion_name}</span>
            </div>
            <div className="popup-synergy">
              {props.synergysData &&
                props.synergysData.map((item) => {
                  return (
                    <SynergyIcon
                      className="popup-synergy-item"
                      key={item.synergy_name}
                      img_src={item.synergy_image}
                      name={item.synergy_name}
                    />
                  );
                })}
            </div>
            <div className="popup-cost">
              <FontAwesomeIcon className="coin" icon={solid("coins")} />
              <span>{props.cost}</span>
            </div>
          </div>
          <div className="popup-items">
            <span>Items: </span>
          </div>
        </div>
      </div>
    </AvatarChampionDefault>
  );
}

export default AvatarChampion;

const AvatarChampionDefault = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  .wrapper {
    position: relative;
    width: 100%;
    .avatar-champion {
      transition: all 0.2s;
      width: 100%;
      height: auto;
      border: 1px solid;
      border-color: ${(props) => props.border_color};
      border-image: ${(props) => props.border_image};
      border-image-slice: ${(props) => (props.border_image ? "1" : "")};
    }
    &:hover {
      .avatar-champion {
        border-color: #d47559;
      }
      .popup {
        visibility: visible;
      }
    }
    .popup {
      transition: all 0.2s;
      position: absolute;
      bottom: calc(100% + 6px);
      transform: translateX(-43%);
      visibility: hidden;
      background-color: #102531;
      border: 1px solid #17313a;
      .popup-info {
        display: flex;
        .popup-avatar {
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-right: 1px solid #17313a;
          justify-content: center;
          span {
            display: flex;
            width: max-content;
            color: white !important;
          }
          img {
            width: 50px;
            height: 50px;
          }
        }
        .popup-synergy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .popup-synergy-item {
            padding: 5px 13px;
            span {
              color: white !important;
            }
          }
        }
        .popup-cost {
          background-color: #0d202b;
          display: flex;
          align-items: center;
          border-left: 1px solid #17313a;
          padding: 0 9px;
          span {
            margin-left: 5px;
          }
        }
      }
      .popup-items {
        background-color: #0d202b;
        border-top: 1px solid #17313a;
        padding: 10px;
      }
    }
  }
`;
