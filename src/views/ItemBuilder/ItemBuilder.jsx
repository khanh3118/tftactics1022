import MainLayout from "layouts/MainLayout";
import styled from "styled-components";
import SelectDropDown from "components/common/SelectDropdown";
import SearchOrigin from "components/common/SearchOrigin";
import { DataContext } from "contexts/DataContext";
import { useContext } from "react";
import { useState } from "react";
import AvatarItem from "components/common/AvatarItem";
import { useEffect } from "react";
import { capitalize } from "utils/filter";

function ItemBuilder() {
  const { itemsData } = useContext(DataContext);
  const [searctText, setSearctText] = useState("");
  const [baseItems, setBaseItems] = useState([
    ...itemsData.filter((item) => item.is_combined === "false"),
  ]);
  const [combinedItems, setCombinedItems] = useState([
    ...itemsData.filter((item) => item.is_combined === "true"),
  ]);
  const [itemDetailName, setItemDetailName] = useState("B.F. Sword");
  const [itemDetail, setItemDetail] = useState(
    itemsData.find((item) => item.item_name === "B.F. Sword")
  );
  const [isBase, setIsBase] = useState(true);
  const [itemRecipes, setItemRecipes] = useState(
    itemsData.filter(
      (item) =>
        item.recipe_1 === itemDetailName.toLowerCase() ||
        item.recipe_2 === itemDetailName.toLowerCase()
    )
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
        itemsData.filter((item) => item.item_name === itemDetailName)
      );
    }
  }, [itemDetailName]);
  useEffect(() => {
    setItemDetail(itemsData.find((item) => item.item_name === itemDetailName));
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
  useEffect(() => {
    setBaseItems([
      ...itemsData.filter(
        (item) =>
          item.is_combined === "false" &&
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
            />
            <BaseItem>
              <div className="base-item-title">
                <span>Base Items</span>
              </div>
              <div className="list-items">
                {baseItems.map((item) => {
                  return (
                    <AvatarItem
                      hanleClick={() => hanleBaseItem(item.item_name)}
                      key={item.item_name}
                      className="base-item-avatar"
                      width="40px"
                      height="40px"
                      name={item.item_name}
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
                {combinedItems.map((item) => {
                  return (
                    <AvatarItem
                      hanleClick={() => hanleCombinedItem(item.item_name)}
                      key={item.item_name}
                      className="base-item-avatar"
                      width="40px"
                      height="40px"
                      name={item.item_name}
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
              <div className="name">TFT Champions Stats</div>
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
                        <AvatarItem
                          className="main-content-table-item-recipe-img"
                          width="35px"
                          height="35px"
                          name={capitalize(item.recipe_1)}
                        />
                        <AvatarItem
                          className="main-content-table-item-recipe-img"
                          width="35px"
                          height="35px"
                          name={capitalize(item.recipe_2)}
                        />
                      </div>
                      <div className="main-content-table-item-info">
                        <AvatarItem
                          className="main-content-table-item-info-img"
                          width="35px"
                          height="35px"
                          name={item.item_name}
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
          </ItemBuildMainContent>
        }
      />
    </ItemBuilderDefault>
  ) : "";
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