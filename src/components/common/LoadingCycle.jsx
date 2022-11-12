import styled from "styled-components";

export default function LoadingCycle(props) {
  return (
    <LoadindCycleWrapper className={props.className}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LoadindCycleWrapper>
  );
}

const LoadindCycleWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(1turn);
      }
    }
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    margin: 8px;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border: 4px solid transparent;
    border-top-color: #227aad;
    &:first-child {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
    &:nth-child(4) {
      animation-delay: -0.45s;
    }
  }
`;
