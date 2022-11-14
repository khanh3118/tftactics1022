import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";

export default function SelectSide({ children, name, count, expand }) {
  const [isExpand, setIsExpand] = useState(expand ? true : false);

  return (
    <SelectSideWrapper isExpand={isExpand} count={count}>
      <div className="title" onClick={() => setIsExpand((pre) => !pre)}>
        <span>{name}</span>
        <FontAwesomeIcon icon={solid("angle-down")} />
      </div>
      <ul>{children}</ul>
    </SelectSideWrapper>
  );
}

const SelectSideWrapper = styled.div`
  transition: all 0.5s;
  overflow: hidden;
  height: ${({ isExpand, count }) =>
    isExpand ? 36 + 39 * count + "px" : "36px"};
  margin-top: 10px;
  .title {
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px 0;
    justify-content: space-between;
    padding-left: ${({ isExpand }) => isExpand && "15px"};
    transition: all 0.3s;
    cursor: pointer;
    margin-bottom: 10px;
    span,
    svg {
      font-size: 16px;
      color: #88a0a7;
      line-height: 100%;
    }
    span {
      color: ${({ isExpand }) => isExpand && "white"};
    }
    svg {
      transition: all 0.3s;
      transform: ${({ isExpand }) => isExpand && "rotate(-180deg)"};
    }
    &::after {
      transition: all 0.1s;
      position: absolute;
      content: "";
      width: ${({ isExpand }) => (isExpand ? "4px" : "0")};
      height: 100%;
      background-color: #227aad;
      left: 0;
    }
  }
  ul {
    list-style: none;
    li {
      cursor: pointer;
      font-size: 15px;
      color: white;
      padding: 7.5px 0;
      display: flex;
      align-items: center;
      .coin,
      .check,
      .synergy-img {
        transition: all 0.3s;
      }
      .coin {
        color: hsla(0, 0%, 100%, 0.25);
        margin-right: 10px;
      }
      .synergy-img {
        margin-right: 10px;
        opacity: 0.7;
      }
      .check {
        margin-left: auto;
        display: inline-block;
        width: 12px;
        height: 12px;
        background-color: transparent;
        border-radius: 50%;
        border: 2px solid hsla(0, 0%, 100%, 0.25);
      }
      &:hover {
        .coin {
          color: white;
        }
        .check {
          border-color: white;
        }
        .synergy-img {
          opacity: 1;
        }
      }
    }
    li.active {
      .coin {
        color: white;
      }
      .check {
        border: 2px solid #227aad;
        background: #227aad;
      }
    }
  }
`;
