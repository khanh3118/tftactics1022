import styled from "styled-components";

export default function Switch(props) {
  return <SwitchWrapper active={props.active}></SwitchWrapper>;
}

const SwitchWrapper = styled.div`
  position: relative;
  display: block;
  width: 26px;
  height: 12px;
  background: #123040;
  border-radius: 100px;
  margin-left: 10px;
  background: ${(props) => props.active ? "#227aad" : "#123040"};
  &::before {
    content: "";
    position: absolute;
    left: 1px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background: hsla(0, 0%, 100%, 0.9);
    border-radius: 100px;
    ${(props) => props.active && `
      left: auto;
      right: 1px;
    `}
  }
`;
