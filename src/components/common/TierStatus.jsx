import React from "react";
import styled from "styled-components";

export default function TierStatus(props) {
  const tiersStyle = {
    s: {
      color: "#ff7f7f",
    },
    a: {
      color: "#ffbf7f",
    },
    b: {
      color: "#ffdf7f",
    },
    c: {
      color: "#ffff7f",
    },
    d: {
      color: "#bfff7f",
    },
  };
  return (
    <React.Fragment>
      <TierStatusDefault {...tiersStyle[props.tier]}>
        {props.tier}
      </TierStatusDefault>
    </React.Fragment>
  );
}

const TierStatusDefault = styled.button`
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  width: 25px;
  height: 25px;
  color: #0d202b;
  font-weight: 600;
`;
