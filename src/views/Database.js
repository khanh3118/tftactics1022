import "./Database.scss";
import ContentMainLayout from "../layouts/ContentMainLayout";
import { Outlet, Link } from "react-router-dom";
import SelectDropDown from "../components/common/SelectDropdown";
import SearchOrigin from "../components/common/SearchOrigin";

function Database() {
  function hanleClick(e) {
    let nav_items = document.querySelectorAll(".navigation-items ul li");
    nav_items.forEach((item) => {
      item.className = "";
    });
    e.target.closest("li").className = "active";
  }
  return (
    <div id="database-default">
      <ContentMainLayout
        nameContent={<span>Database</span>}
        sideContent={
          <div className="navigation-items">
            <ul>
              <li className="active" onClick={(e) => hanleClick(e)}>
                <Link to="/database/champions" className="header-item">
                  Champions
                </Link>
              </li>
              <li onClick={(e) => hanleClick(e)}>
                <Link to="/database/championstats" className="header-item">
                  Champions Stats
                </Link>
              </li>
              <li onClick={(e) => hanleClick(e)}>
                <Link to="/database/origins" className="header-item">
                  Origins
                </Link>
              </li>
              <li onClick={(e) => hanleClick(e)}>
                <Link to="/database/classes" className="header-item">
                  Classes
                </Link>
              </li>
              <li onClick={(e) => hanleClick(e)}>
                <Link to="/database/rolling" className="header-item">
                  Rolling
                </Link>
              </li>
              <li onClick={(e) => hanleClick(e)}>
                <Link to="/database/augments" className="header-item">
                  Augments
                </Link>
              </li>
            </ul>
          </div>
        }
        titleContent={
          <div className="title">
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
                placeholder="Search for a champion..."
                className="search"
              />
            </div>
          </div>
        }
        mainContent={
          <div className="main-content">
            <Outlet />
          </div>
        }
      />
    </div>
  );
}

export default Database;
