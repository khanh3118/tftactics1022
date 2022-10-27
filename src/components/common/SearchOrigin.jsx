import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import SelectDropdown from "./SelectDropdown";
import styled from "styled-components";

function SearchOrigin(props) {
  const [text, setText] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  function hanleChange(e) {
    setText(e.target.value);
  }
  return (
    <OriginSeachDefault isFocus={isFocus} id="origin-search" className={props.className}>
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
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
          <FontAwesomeIcon
            className="search-icon"
            size="xs"
            icon={solid("magnifying-glass")}
          />
        </div>
      </div>
    </OriginSeachDefault>
  );
}

export default SearchOrigin;

const OriginSeachDefault = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #17313a;
  border-radius: 4px;
  transition: all 0.3s;
  outline: ${props => props.isFocus ? "1px solid #d47559" : ""};
  .search-default {
    background-color: #102531;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 10px;
    width: 100%;
    .search {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-grow: 1;
      input {
        background: none;
        border: none;
        outline: none;
        color: white;
        width: 100%;
        &::placeholder {
          color: #88a0a7;
          font-size: 13px;
          font-weight: 600;
        }
      }
      .search-icon {
        cursor: pointer;
        opacity: 0.8;
        transition: all 0.3s;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
`;
