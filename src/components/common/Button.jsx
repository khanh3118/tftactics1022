import styled from "styled-components";

function Button(props) {
  return (
    <ButtonDefault id="defaul-button" className={props.className}>
      {props.children}
      <span>{props.btnText}</span>
    </ButtonDefault>
  );
}

export default Button;

const ButtonDefault = styled.div`
  padding: 7px 12px;
  display: flex;
  align-items: center;
  width: max-content;
  span {
    font-size: 14px;
    font-weight: 600;
  }
`;
