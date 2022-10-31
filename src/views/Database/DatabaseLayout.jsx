import MainLayout from "layouts/MainLayout";
import { Outlet, NavLink } from "react-router-dom";
import SelectDropDown from "components/common/SelectDropdown";
import SearchOrigin from "components/common/SearchOrigin";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function DatabaseLayout() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/database/championstats");
  }, []);
  function hanleSearch(searchText) {
    setSearchText(searchText);
  }
  return (
    <DatabaseDefault id="database-default">
      <MainLayout
        nameContent={
          <DatabaseLayoutTitle>
            <span className="database-layout-tile">Database</span>
          </DatabaseLayoutTitle>
        }
        sideContent={
          <div className="navigation-items">
            <ul>
              <li className="active">
                <NavLink to="/database/champions" className="header-item">
                  Champions
                </NavLink>
              </li>
              <li>
                <NavLink to="/database/championstats" className="header-item">
                  Champions Stats
                </NavLink>
              </li>
              <li>
                <NavLink to="/database/origins" className="header-item">
                  Origins
                </NavLink>
              </li>
              <li>
                <NavLink to="/database/classes" className="header-item">
                  Classes
                </NavLink>
              </li>
            </ul>
          </div>
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
            <div className="title-2">
              <SearchOrigin
                placeholder="Search by name..."
                className="search"
                hanleSearch={hanleSearch}
              />
            </div>
          </Title>
        }
        mainContent={
          <MainContent className="main-content">
            <Outlet context={searchText} />
          </MainContent>
        }
      />
    </DatabaseDefault>
  );
}

export default DatabaseLayout;

const DatabaseLayoutTitle = styled.div`
  min-height: 35px;
  padding-bottom: 20px;
  border-bottom: 1px solid #17313a;
  span {
    display: block;
    min-height: 32px;
    font-size: 21px;
    font-weight: 600;
  }
`

const DatabaseDefault = styled.div`
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
  .content {
    padding-left: 30px;
  }
`;

const MainContent = styled.div`
  padding-top: 20px;
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
