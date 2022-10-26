import "./SearchOrigin.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import SelectDropdown from "./SelectDropdown";

function SearchOrigin(props) {
  const [text, setText] = useState("");
  const [originSearchClass, setoriginSearchClass] = useState("");
  function hanleChange(e) {
    setText(e.target.value);
  }
  function hanleFocus() {
    setoriginSearchClass("focused");
  }
  function hanleBlur() {
    setoriginSearchClass("");
  }
  return (
    <div id="origin-search" className={originSearchClass}>
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
            onFocus={hanleFocus}
            onBlur={hanleBlur}
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
