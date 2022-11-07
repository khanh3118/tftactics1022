import styled from "styled-components";
import { DataContext } from "contexts/DataContext";
import { useContext, useState } from "react";
import LoadingCycle from "components/common/LoadingCycle";

export default function ItemInfo(props) {
  const { itemsData } = useContext(DataContext);
  const [hiddenPopup, setHiddenPopup] = useState(true);
  const [loadDone, setLoadDone] = useState(false);

  const itemDetail = itemsData.find(
    (item) => item.item_name.toLowerCase() === props.item_name.toLowerCase()
  );

  function getItemRecipeImg(name) {
    return itemsData.find((item) => item.item_name.toLowerCase() === name)
      .item_image;
  }
  return (
    <ItemInfoDefault
      onMouseEnter={() => setHiddenPopup(false)}
      onClick={props.hanleClick}
      className={props.className}
    >
      <Wrapper loadDone={loadDone} width={props.width} height={props.height}>
        <img
          draggable={true}
          onDragStart={(e) =>
            e.dataTransfer.setData(
              "item_name",
              itemDetail.item_name
            )
          }
          className="avatar-item-img"
          src={itemDetail.item_image}
          alt=""
        />
        {hiddenPopup || (
          <div className="avatar-item-popup">
            <div className="popup-info">
              <div className="popup-info-avatar">
                <img
                  width="42px"
                  height="42px"
                  src={itemDetail.item_image}
                  alt=""
                />
              </div>
              <div className="popup-info-title">
                <div className="popup-info-title-name">
                  <span>{itemDetail.item_name}</span>
                </div>
                <div className="popup-info-title-stats">
                  {Object.keys(itemDetail.item_stats).map((item) => {
                    return (
                      <span key={item}>{itemDetail.item_stats[item]}</span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="popup-info-description">
              {itemDetail.item_description}
              {itemDetail.is_unique_item === "true" &&
                itemDetail.item_name !== "Thief's Gloves" && (
                  <p className="special-item">[Unique - only 1 per champion]</p>
                )}
              {itemDetail.is_aura_item === "true" && (
                <p className="special-item">[Aura item]</p>
              )}
              {itemDetail.item_name === "Thief's Gloves" && (
                <p className="special-item">[Consumes 3 item slots.]</p>
              )}
            </div>
            <div className="loading">
              <LoadingCycle />
            </div>
            <div className="popup-items">
              <span>
                Recipes:
                {itemDetail.is_combined === "true" && (
                  <span>
                    <img src={getItemRecipeImg(itemDetail.recipe_1)} alt="" />
                    <img
                      src={getItemRecipeImg(itemDetail.recipe_2)}
                      alt=""
                      onLoad={() => {
                        setLoadDone(true);
                      }}
                    />
                  </span>
                )}
                {itemDetail.is_combined === "false" && (
                  <span>
                    {itemsData
                      .filter(
                        (item) =>
                          item.recipe_1 ===
                            itemDetail.item_name.toLowerCase() ||
                          item.recipe_1 === itemDetail.item_name.toLowerCase()
                      )
                      .map((item, index, arr) => {
                        return (
                          <img
                            key={item.item_name}
                            src={item.item_image}
                            alt={item.item_name}
                            onLoad={() => {
                              if (index === arr.length - 1) {
                                setLoadDone(true);
                              }
                            }}
                          />
                        );
                      })}
                  </span>
                )}
              </span>
            </div>
          </div>
        )}
      </Wrapper>
    </ItemInfoDefault>
  );
}

const ItemInfoDefault = styled.div`
  position: relative;
  &:hover {
    .avatar-item-popup {
      display: block;
    }
  }
`;
const Wrapper = styled.div`
  .loading {
    display: ${(props) => (props.loadDone === true ? "none" : "block")};
    padding: 20px;
    border: 1px solid #17313a;
  }
  .avatar-item-img {
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid #17313a;
    width: ${(props) => props.width} !important;
    height: ${(props) => props.height} !important;
    &:hover {
      border-color: #d47559;
    }
  }
  .avatar-item-popup {
    z-index: 1000;
    min-width: 500px;
    display: none;
    position: absolute;
    bottom: calc(100% + 6px);
    transform: translateX(-50%)
      translateX(${(props) => Number(props.width.split("px")[0]) / 2 + "px"});
    background-color: #102531;
    border: 1px solid #17313a;
    .popup-info {
      display: ${(props) => (props.loadDone === true ? "flex" : "none")};
      padding: 10px;
      .popup-info-avatar {
        display: ${(props) => (props.loadDone === true ? "flex" : "none")};
      }
      .popup-info-title {
        padding-left: 10px;
        .popup-info-title-stats {
          span {
            margin-right: 10px;
          }
        }
      }
    }
    .popup-info-description {
      display: ${(props) => (props.loadDone === true ? "block" : "none")};
      border-top: 1px solid #17313a;
      padding: 10px;
      .special-item {
        margin: 10px 0 0 0;
      }
    }
    .popup-items {
      display: ${(props) => (props.loadDone === true ? "block" : "none")};
      background-color: #0d202b;
      border-top: 1px solid #17313a;
      padding: 10px;
      img {
        border: 1px solid #17313a;
        width: 25px;
        height: 25px;
        margin-left: 5px;
        &:nth-child(1) {
          margin-left: 10px !important;
        }
      }
    }
  }
`;
