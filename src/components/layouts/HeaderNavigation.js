import "./HeaderNavigation.scss";
import { Outlet, Link, useLoaderData, Form } from "react-router-dom";

function HeaderNavigation(props) {
  function hanleClick(e) {
    let nav_items = document.querySelectorAll(".header-item");
    nav_items.forEach((item) => {
      item.className = "header-item";
    });
    e.target.className = "header-item active";
  }
  return (
    <div id="header-navigation">
      <div className="wrapper">
        <ul>
          <li>
            <Link
              to="main/database"
              onClick={(e) => hanleClick(e)}
              className="header-item"
            >
              Team Comps
            </Link>
          </li>
          <li>
            <Link
              to="main/database"
              onClick={(e) => hanleClick(e)}
              className="header-item"
            >
              Meta Report
            </Link>
          </li>
          <li>
            <Link
              to="main/database"
              onClick={(e) => hanleClick(e)}
              className="header-item"
            >
              Champions
            </Link>
          </li>
          <li>
            <Link
              to="database"
              onClick={(e) => hanleClick(e)}
              className="header-item"
            >
              Tier Lists
            </Link>
          </li>
          <li>
            <Link
              to="itembuilder"
              onClick={(e) => hanleClick(e)}
              className="header-item"
            >
              Item Builder
            </Link>
          </li>
          <li>
            <Link
              to="main/database"
              onClick={(e) => hanleClick(e)}
              className="header-item"
            >
              Team Builder
            </Link>
          </li>
          <li>
            <Link
              to="database"
              onClick={(e) => hanleClick(e)}
              className="header-item"
            >
              Database
            </Link>
          </li>
          <li>
            <Link
              to="main/database"
              onClick={(e) => hanleClick(e)}
              className="header-item"
            >
              Patch Notes
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderNavigation;
