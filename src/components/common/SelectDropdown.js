import "./SelectDropdown.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import Button from "./Button";
import { useState } from "react";

function Select(props) {
  const [showDropdown, setshowDropdown] = useState(false);
  function hanleClick() {
    setshowDropdown(!showDropdown);
  }
  function dropdownItemClass(isSelected) {
    if (isSelected) return "dropdown-item selected"
    return "dropdown-item";
  }
  return (
    <div className={props.className} id="default-select" onClick={hanleClick}>
      <div className="value">
        <span>{props.placeholder}</span>
      </div>
      <div className="button-dropdown">
        <FontAwesomeIcon icon={solid("caret-down")} />
      </div>
      {showDropdown ? (
        <div className="dropdown">
          {props.dropDownItems.map((item) => {
            return (
              <Button
                className={dropdownItemClass(item?.isSelected)}
                btnText={item.text}
                key={item}
              />
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Select;
