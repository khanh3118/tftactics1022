import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

function TopNavigation(props) {
  return (
    <TopNavigationDefault
      id="header-navigation"
      isOpenNaviagtion={props.isOpenNaviagtion}
    >
      <div className="wrapper">
        <ul>
          <li>
            <NavLink onClick={() => props.hanleClickLink()} to="teamcomps" className="header-item">
              Team Comps
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => props.hanleClickLink()} to="teambuilder" className="header-item">
              Team Builder
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => props.hanleClickLink()} to="/champions" className="header-item">
              Champions
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => props.hanleClickLink()} to="database" className="header-item">
              Database
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => props.hanleClickLink()} to="/metareport" className="header-item">
              Meta Report
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => props.hanleClickLink()} to="itembuilder" className="header-item">
              Item Builder
            </NavLink>
          </li>
          <li>
            <Link to="/" className="header-item">
              Patch Notes
            </Link>
          </li>
          <li>
            <Link to="/" className="header-item">
              Tier Lists
            </Link>
          </li>
        </ul>
      </div>
    </TopNavigationDefault>
  );
}

export default TopNavigation;

const TopNavigationDefault = styled.div`
  height: 50px;
  background-color: #102531;
  border-bottom: 1px solid #17313a;
  border-top: 1px solid #17313a;
  .wrapper {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    height: 100%;
    ul {
      display: flex;
      list-style: none;
      flex-grow: 1;
      margin-bottom: 0;
      li {
        flex-grow: 1;
        height: 100%;
        .header-item {
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          padding: 0 10px;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          color: #88a0a7;
          text-decoration: none;
          &::after {
            transition: all 0.3s;
            content: "";
            position: absolute;
            left: 50%;
            width: 0%;
            bottom: -1px;
            height: 4px;
            background-color: #d47559;
            transform: translateX(-50%);
          }
        }
        .header-item:hover {
          color: white;
        }
      }
    }
    .header-item.active {
      color: white;
      &::after {
        width: 100%;
      }
    }
  }
  @media (max-width: 1024px) {
    padding-left: 45px;
    padding-right: 45px;
    position: absolute;
    width: 100%;
    height: unset;
    z-index: 99999999;
    background-color: #0d202b;
    padding-top: 40px;
    transition: all 0.3s;
    opacity: ${({ isOpenNaviagtion }) => (isOpenNaviagtion ? 1 : 0)};
    visibility: ${({ isOpenNaviagtion }) =>
      isOpenNaviagtion ? "visible" : "hidden"};
    .wrapper {
      min-height: 100vh;
      ul {
        flex-direction: column;
        li {
          height: unset;
          flex-grow: unset;
          padding: 20px;
          .header-item {
            height: unset;
            font-size: 16px;
            &::after {
              display: none;
            }
          }
          .header-item:hover {
            color: white;
          }
        }
      }
    }
  }
`;
