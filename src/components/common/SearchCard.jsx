import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";

export default function SearchCard({
  children,
  placeholder,
  hanle_search,
  filter,
  hanle_on_drop,
}) {
  const [searchText, setSearchText] = useState("");
  function hanleChange(inputText) {
    setSearchText(inputText);
    hanle_search(inputText.trim().toLowerCase());
  }
  return (
    <SearchCardWrapper
      onDrop={hanle_on_drop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="search">
        <div className="search-default">
          <FontAwesomeIcon
            className="search-icon"
            icon={solid("magnifying-glass")}
            size="sm"
          />
          <input
            onChange={(e) => hanleChange(e.target.value)}
            value={searchText}
            type="text"
            placeholder={placeholder}
          />
        </div>
        <div className="search-filter">{filter}</div>
      </div>
      <div className="content">{children}</div>
    </SearchCardWrapper>
  );
}

const SearchCardWrapper = styled.div`
  border: 1px solid #17313a;
  color: hsla(0, 0%, 100%, 0.9);
  font-size: 14px;
  background-color: #102531;
  width: 100%;
  .search {
    min-height: 35px;
    padding-left: 10px;
    border-bottom: 1px solid #17313a;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    .search-default {
      display: flex;
      align-items: center;
      flex-grow: 1;
      input {
        border: none;
        background-color: transparent;
        outline: none;
        margin-left: 10px;
        width: 100%;
        &::placeholder {
          color: #88a0a7;
          font-size: 14px;
          font-weight: 400;
        }
      }
      .search-icon {
        opacity: 0.9;
      }
    }
    .search-filter {
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }
  .content {
    padding: 5px 10px;
    display: flex;
    flex-wrap: wrap;
  }
`;
