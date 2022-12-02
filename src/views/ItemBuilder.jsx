import MainLayout from "layouts/MainLayout";
import styled from "styled-components";
import SelectDropDown from "components/common/SelectDropdown";
import SearchOrigin from "components/common/SearchOrigin";
import { DataContext } from "contexts/DataContext";
import { Fragment, useContext } from "react";
import { useState } from "react";
import ItemInfo from "components/info/ItemInfo";
import { useEffect } from "react";
import { capitalize } from "utils/filter";
import { useLocation } from "react-router-dom";

function ItemBuilder() {
  const { state } = useLocation();
  const { itemsData } = useContext(DataContext);
  const [searctText, setSearctText] = useState("");
  const [baseItems, setBaseItems] = useState([
    ...itemsData.filter(
      (item) => item.is_combined === "false" && !item.is_trait
    ),
  ]);
  const [combinedItems, setCombinedItems] = useState([
    ...itemsData.filter((item) => item.is_combined === "true"),
  ]);
  const [itemDetailName, setItemDetailName] = useState(
    state?.item_name || "B.F. Sword"
  );
  const [itemDetail, setItemDetail] = useState(
    itemsData.find(
      (item) => item.item_name.toLowerCase() === itemDetailName.toLowerCase()
    )
  );
  const [isBase, setIsBase] = useState(() => {
    if (state?.item_name !== undefined) {
      let i = itemsData.find(
        (i) => i.item_name.toLowerCase() === state?.item_name.toLowerCase()
      );
      if (i.is_combined === "false") return true;
      if (i.is_combined === "true") return false;
    } else {
      return true;
    }
  });
  const [itemRecipes, setItemRecipes] = useState(
    itemsData.filter((item) => {
      return (
        item.recipe_1 === itemDetailName.toLowerCase() ||
        item.recipe_2 === itemDetailName.toLowerCase()
      );
    })
  );
  useEffect(() => {
    if (isBase) {
      setItemRecipes(
        itemsData.filter(
          (item) =>
            item.recipe_1 === itemDetailName.toLowerCase() ||
            item.recipe_2 === itemDetailName.toLowerCase()
        )
      );
    } else {
      setItemRecipes(
        itemsData.filter(
          (item) =>
            item.item_name.toLowerCase() === itemDetailName.toLowerCase()
        )
      );
    }
  }, [itemDetailName]);
  useEffect(() => {
    setItemDetail(
      itemsData.find(
        (item) => item.item_name.toLowerCase() === itemDetailName.toLowerCase()
      )
    );
  }, [itemDetailName]);
  function hanleBaseItem(name) {
    setIsBase(true);
    setItemDetailName(name);
  }
  function hanleCombinedItem(name) {
    setIsBase(false);
    setItemDetailName(name);
  }
  function hanleSearch(a) {
    setSearctText(a);
  }
  function getItemClass(itemName) {
    if (itemName.toLowerCase() === itemDetailName.toLowerCase())
      return "base-item-avatar active";
    return "base-item-avatar";
  }
  useEffect(() => {
    setBaseItems([
      ...itemsData.filter(
        (item) =>
          item.is_combined === "false" &&
          !item.is_trait &&
          item.item_name.toLowerCase().includes(searctText)
      ),
    ]);
    setCombinedItems([
      ...itemsData.filter(
        (item) =>
          item.is_combined === "true" &&
          item.item_name.toLowerCase().includes(searctText)
      ),
    ]);
  }, [searctText]);
  return itemDetail ? (
    <ItemBuilderDefault id="item-builder">
      <MainLayout
        sideContent={
          <ItemBulderSideContent>
            <h1>Choose an Item</h1>
            <SearchOrigin
              placeholder="Search for an item..."
              className="sidecontent-search"
              hanleSearch={hanleSearch}
              reverse={true}
            />
            <BaseItem>
              <div className="base-item-title">
                <span>Base Items</span>
              </div>
              <div className="list-items">
                {baseItems
                  .sort((a, b) => a.item_name.localeCompare(b.item_name))
                  .map((item) => {
                    return (
                      <ItemInfo
                        disableRedirect={true}
                        hanleClick={() => hanleBaseItem(item.item_name)}
                        key={item.item_name}
                        className={getItemClass(item.item_name)}
                        width="40px"
                        height="40px"
                        item_name={item.item_name}
                      />
                    );
                  })}
              </div>
            </BaseItem>
            <BaseItem>
              <div className="base-item-title">
                <span>Combined Items</span>
              </div>
              <div className="list-items">
                {combinedItems
                  .sort(
                    (a, b) =>
                      (a.is_trait === b.is_trait ? 0 : a.is_trait ? -1 : 1) ||
                      a.item_name.localeCompare(b.item_name)
                  )
                  .map((item) => {
                    return (
                      <ItemInfo
                        disableRedirect={true}
                        hanleClick={() => hanleCombinedItem(item.item_name)}
                        key={item.item_name}
                        className={getItemClass(item.item_name)}
                        width="40px"
                        height="40px"
                        item_name={item.item_name}
                      />
                    );
                  })}
              </div>
            </BaseItem>
          </ItemBulderSideContent>
        }
        titleContent={
          <Title className="title">
            <div className="title-1">
              <div className="name">TFT Items Cheat Sheet</div>
              <SelectDropDown
                dropDownItems={[{ text: "Set 7.5", isSelected: true }]}
                placeholder="Set 7.5"
                className="dropdown"
              />
            </div>
          </Title>
        }
        mainContent={
          <ItemBuildMainContent>
            {itemRecipes.length > 0 ? (
              <Fragment>
                <div className="main-content-title">
                  <img src={itemDetail.item_image} alt="" />
                  <span>{itemDetail.item_name}</span>
                </div>
                <div className="main-content-table">
                  <div className="main-content-table-header">
                    <div className="main-content-table-header-item">Recipe</div>
                    <div className="main-content-table-header-item">
                      Combines Info
                    </div>
                  </div>
                  <div className="main-content-table-items">
                    {itemRecipes.map((item) => {
                      return (
                        <div
                          key={item.item_name}
                          className="main-content-table-item"
                        >
                          <div className="main-content-table-item-recipe">
                            <ItemInfo
                              hanleClick={() => {
                                setItemDetailName(item.recipe_1);
                                setIsBase(true);
                              }}
                              disableRedirect={true}
                              className="main-content-table-item-recipe-img"
                              width="35px"
                              height="35px"
                              item_name={capitalize(item.recipe_1)}
                            />
                            <ItemInfo
                              hanleClick={() => {
                                setItemDetailName(item.recipe_2);
                                setIsBase(true);
                              }}
                              disableRedirect={true}
                              className="main-content-table-item-recipe-img"
                              width="35px"
                              height="35px"
                              item_name={capitalize(item.recipe_2)}
                            />
                          </div>
                          <div className="main-content-table-item-info">
                            <ItemInfo
                              hanleClick={() => {
                                setItemDetailName(item.item_name);
                                setIsBase(false);
                              }}
                              disableRedirect={true}
                              className="main-content-table-item-info-img"
                              width="35px"
                              height="35px"
                              item_name={item.item_name}
                            />
                            <div className="main-content-table-item-info-description">
                              <p>{item.item_description}</p>
                              {item.is_unique_item === "true" ? (
                                <p className="special-item">
                                  [Unique - only 1 per champion]
                                </p>
                              ) : (
                                ""
                              )}
                              {item.is_unique_aura === "true" ? (
                                <p className="special-item">[Aura item]</p>
                              ) : (
                                ""
                              )}
                              {item.item_name === "Thief's Gloves" ? (
                                <p className="special-item">
                                  [Consumes 3 item slots.]
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Fragment>
            ) : (
              "Item can't be craft"
            )}
          </ItemBuildMainContent>
        }
      />
    </ItemBuilderDefault>
  ) : (
    ""
  );
}

export default ItemBuilder;

const ItemBuildMainContent = styled.div`
  padding-top: 20px;
  .main-content-title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    img {
      width: 30px;
      height: 30px;
      margin-right: 15px;
    }
  }
  .main-content-table {
    border: 1px solid #17313a;
    font-size: 14px;
    color: #88a0a7;
    .main-content-table-header {
      background-color: #102531;
      padding: 10px 20px;
      display: grid;
      grid-template-columns: 20% 80%;
      border-bottom: 1px solid #17313a;
    }
    .main-content-table-items {
      .main-content-table-item {
        display: grid;
        grid-template-columns: 20% 80%;
        border-bottom: 1px solid #17313a;
        .main-content-table-item-recipe {
          padding: 10px 10px 10px 20px;
          display: flex;
          align-items: center;
          .main-content-table-item-recipe-img {
            &:nth-child(1) {
              margin-right: 10px;
            }
          }
        }
        .main-content-table-item-info {
          padding: 10px 10px 10px 10px;
          display: flex;
          align-items: center;
          .main-content-table-item-info-img {
          }
          .main-content-table-item-info-description {
            margin-left: 20px;
            p {
              margin: 0;
            }
            .special-item {
              margin-top: 15px;
            }
          }
        }
      }
    }
  }
`;

const ItemBuilderDefault = styled.div`
  .content {
    padding-left: 30px;
  }
`;

const BaseItem = styled.div`
  .base-item-title {
    border-bottom: 1px solid #17313a;
    span {
      border-bottom: 4px solid #d47559;
      display: inline-block;
      font-size: 16px;
      padding: 0 10px 10px 10px;
    }
  }
  .list-items {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    .base-item-avatar {
      padding: 7.5px 5px;
      .avatar-item-img {
        opacity: 0.5;
      }
    }
    .base-item-avatar.active {
      .avatar-item-img {
        opacity: 1;
        border: 1px solid #d47559;
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

const ItemBulderSideContent = styled.div`
  color: white;
  font-size: 16px;
  .sidecontent-search {
    margin-bottom: 20px;
  }
  h1 {
    color: white;
    font-size: 21px;
    margin-bottom: 20px;
  }
  .sidecontent-search {
    border-radius: 0;
  }
`;
