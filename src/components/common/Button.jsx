import styled from "styled-components";

function Button(props) {
  return (
    <ButtonDefault id="defaul-button" className={props.className}>
      <span>{props.btnText}</span>
    </ButtonDefault>
  );
}

export default Button;

const ButtonDefault = styled.div`
  padding: 7px 12px;
  span {
    font-size: 14px;
    font-weight: 600;
  }
`;
