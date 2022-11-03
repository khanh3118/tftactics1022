const { default: styled } = require("styled-components");

export default function Status(props) {
  const stylesStatus = {
    up: {
      color: "#bfff7f",
      "font-size": "22px",
    },
    down: {
      color: "#ff7f7f",
      "font-size": "22px",
    },
    new: {
      color: "#ffdf7f",
      "font-size": "10px",
    }
  }
  return (
    <StatusWrapper className={props.className} {...stylesStatus[props.status]}>
      {props.status === "up" && "▴"}
      {props.status === "down" && "▾"}
      {props.status === "new" && "n"}
    </StatusWrapper>
  );
}

const StatusWrapper = styled.div`
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props["font-size"]};
  font-weight: 600;
  text-transform: uppercase;
`;
