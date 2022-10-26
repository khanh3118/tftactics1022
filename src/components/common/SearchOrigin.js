import "./SearchOrigin.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import SelectDropdown from "./SelectDropdown";

function SearchOrigin(props) {
  const [text, setText] = useState("");
  function hanleChange(e) {
    setText(e.target.value);
  }
  function hanleFocus(e) {
    e.target.closest("#origin-search").className = `${props.className} focused`;
  }
  function hanleBlur(e) {
    e.target.closest("#origin-search").className = `${props.className}`;
  }
  return (
    <div id="origin-search" className={props.className}>
      {props.leftContentPlaceholder ? (
        <div className="origin">
          <SelectDropdown
            dropDownItems={props.dropdown}
            placeholder={props.leftContentPlaceholder}
          />
        </div>
      ) : (
        ""
      )}
      <div className="search-default">
        <div className="search">
          <input
            onChange={(e) => hanleChange(e)}
            type="text"
            placeholder={props.placeholder}
            value={text}
            onFocus={(e) => hanleFocus(e)}
            onBlur={(e) => hanleBlur(e)}
          />
          <FontAwesomeIcon
            className="search-icon"
            size="xs"
            icon={solid("magnifying-glass")}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchOrigin;
