import MainLayout from "layouts/MainLayout";
import styled from "styled-components";
import SelectDropDown from "components/common/SelectDropdown";
import { DataContext } from "contexts/DataContext";
import { MetaReportContext } from "contexts/MetaReportContext";
import { useContext, useState } from "react";
import Button from "components/common/Button";
import Status from "components/common/Status";
import MetaInfo from "components/info/MetaInfo";
import { NavLink } from "react-router-dom";
import { getTraitsBonus } from "utils/filter";

function MetaReport() {
  const { championsData, synergysData } = useContext(DataContext);
  const { metaComps } = useContext(MetaReportContext);
  const [includedTraits, setIncludedTraits] = useState(() => {
    let result = metaComps.map((team_detail) => {
      let all = team_detail.members.map((member) => {
        let championDetail = championsData.find(
          (c) => c.champion_name === member.member_name
        );
        return {
          ...member,
          ...championDetail,
        };
      });
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

      let allItems = all.reduce((total, current) => {
        return total.concat(current.member_items);
      }, []);

      let traits = getTraitsBonus(allItems, uniqueSys, synergysData, all);

      return {
        ...team_detail,
        traits,
      };
    });
    return result;
  });

  const [filteredData, setFilteredData] = useState(includedTraits);

  return (
    <MetaReportWrapper id="item-builder">
      <MainLayout
        nameContent={
          <MetaReportTitle>
            <span>Filter</span>
          </MetaReportTitle>
        }
        sideContent={
          <MetareportSideContent>
            <div className="navigation-items">
              <ul>
                <li>
                  <NavLink to="/metareport" className="header-item">
                    Team Comps
                  </NavLink>
                </li>
              </ul>
            </div>
          </MetareportSideContent>
        }
        titleContent={
          <Title className="title">
            <div className="title-1">
              <div className="name">Meta Team Comps</div>
              <SelectDropDown
                dropDownItems={[{ text: "Set 7.5", isSelected: true }]}
                placeholder="Set 7.5"
                className="dropdown"
              />
            </div>
          </Title>
        }
        mainContent={
          <MetaReportMainContent>
            <div className="metareport-title">
              <div className="metareport-title-patch">
                <Button
                  className="metareport-title-patch-btn"
                  btnText="Patch 12.20b"
                />
              </div>
              <div className="metareport-title-tier">
                <Button
                  className="metareport-title-patch-btn"
                  btnText="Tier Up"
                >
                  <Status status="up" />
                </Button>
                <Button
                  className="metareport-title-patch-btn"
                  btnText="Tier Down"
                >
                  <Status status="down" />
                </Button>
                <Button className="metareport-title-patch-btn" btnText="New">
                  <Status status="new" />
                </Button>
              </div>
            </div>
            <div className="metareport-wrapper">
              <div className="metareport">
                {filteredData.map((team) => {
                  return <MetaInfo key={team.name} team_detail={team} />;
                })}
              </div>
            </div>
          </MetaReportMainContent>
        }
      />
    </MetaReportWrapper>
  );
}

export default MetaReport;

const MetaReportTitle = styled.div`
  min-height: 35px;
  padding-bottom: 20px;
  border-bottom: 1px solid #17313a;
  span {
    display: block;
    min-height: 32px;
    font-size: 21px;
    font-weight: 600;
  }
`;

const MetaReportMainContent = styled.div`
  padding-top: 20px;
  .metareport-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .metareport-title-patch-btn {
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
    .metareport-title-tier {
      display: flex;
      align-items: center;
    }
  }
`;

const MetaReportWrapper = styled.div`
  .content {
    padding-left: 30px;
  }
  .navigation-items {
    ul {
      list-style: none;
      li {
        position: relative;
        cursor: pointer;
        margin: 10px 0;
        &:hover a {
          color: white;
        }
        a {
          text-decoration: none;
          color: #88a0a7;
          font-size: 16px;
          font-weight: 400;
          padding: 4px 0 4px 0;
          width: 100%;
          display: inline-block;
        }
        a.active {
          padding-left: 20px;
          color: white;
          &::after {
            position: absolute;
            content: "";
            left: 0;
            background-color: #227aad;
            width: 4px;
            top: 0;
            bottom: 0;
          }
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
      width: 300px;
    }
  }
`;

const MetareportSideContent = styled.div`
  color: white;
  font-size: 16px;
`;
