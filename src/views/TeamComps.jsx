import MainLayout from "layouts/MainLayout";
import styled from "styled-components";
import SelectDropDown from "components/common/SelectDropdown";
import SearchOrigin from "components/common/SearchOrigin";
import { DataContext } from "contexts/DataContext";
import { useContext } from "react";
import Button from "components/common/Button";
import Status from "components/common/Status";
import CompInfo from "components/info/CompInfo";

function ItemBuilder() {
  const { teamcompsData, compsData } = useContext(DataContext);
  return (
    <TeamCompsWrapper id="item-builder">
      <MainLayout
        sideContent={<ItemBulderSideContent></ItemBulderSideContent>}
        titleContent={
          <Title className="title">
            <div className="title-1">
              <div className="name">TFT Meta Team Comps Tier List</div>
              <SelectDropDown
                dropDownItems={[{ text: "Set 7.5", isSelected: true }]}
                placeholder="Set 7.5"
                className="dropdown"
              />
            </div>
            <div className="title-2">
              <SearchOrigin
                placeholder="Search by team, champion or trait..."
                className="search"
              />
            </div>
          </Title>
        }
        mainContent={
          <TeamCompsMainContent>
            <div className="teamcomps-title">
              <div className="teamcomps-title-patch">
                <Button
                  className="teamcomps-title-patch-btn"
                  btnText="Patch 12.20b"
                />
              </div>
              <div className="teamcomps-title-tier">
                <Button className="teamcomps-title-patch-btn" btnText="Tier Up">
                  <Status status="up" />
                </Button>
                <Button
                  className="teamcomps-title-patch-btn"
                  btnText="Tier Down"
                >
                  <Status status="down" />
                </Button>
                <Button className="teamcomps-title-patch-btn" btnText="New">
                  <Status status="new" />
                </Button>
              </div>
            </div>
            <div className="team-comps-wrapper">
              <div className="team-comps">
                {teamcompsData.map((team) => {
                  return (
                    <CompInfo
                      status={team.status}
                      key={team.name}
                      team_detail={team}
                    />
                  );
                })}
              </div>
            </div>
          </TeamCompsMainContent>
        }
      />
    </TeamCompsWrapper>
  );
}

export default ItemBuilder;

const TeamCompsMainContent = styled.div`
  padding-top: 20px;
  .teamcomps-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .teamcomps-title-patch {
    }
    .teamcomps-title-patch-btn {
      color: #88a0a7;
      background: #123040;
      border-radius: 3px;
      :nth-child(2) {
        margin-right: 10px;
      }
      :nth-child(1) {
        margin-right: 10px;
      }
    }
    .teamcomps-title-tier {
      display: flex;
      align-items: center;
    }
  }
`;

const TeamCompsWrapper = styled.div`
  .content {
    padding-left: 30px;
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
