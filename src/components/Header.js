import "./Header.scss";
import SelectDropdown from "./common/SelectDropdown";
import SearchOrigin from "./common/SearchOrigin";
import Button from "./common/Button";

function Header() {
  return (
    <div id="root-header">
      <div className="wrapper">
        <div className="icon-version">
          <div className="icon">
            <img alt="TFTactics" src="https://rerollcdn.com/brand.svg" />
          </div>
          <div className="version">
            <SelectDropdown
              dropDownItems={[{ text: "Set 7.5", isSelected: true }]}
              placeholder="Set 7.5"
              className="version-dropdown"
            />
          </div>
        </div>
        <div className="search-bar">
          <SearchOrigin
            dropdown={[{ text: "NA", isSelected: true }, { text: "EU" }]}
            leftContentPlaceholder="NA"
            placeholder="Search Summoner Name..."
          />
        </div>
        <div className="download">
          <Button className="download-btn" btnText="download app" />
        </div>
      </div>
    </div>
  );
}

export default Header;
