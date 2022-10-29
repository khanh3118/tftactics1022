import styled from "styled-components";

function SynergyIcon(props) {
  return (
    <SynergyIconDefault className={props.className}>
      <div className="wrapper">
        <img src={props.img_src} alt={props.img_alt} />
        <span>{props.name}</span>
      </div>
    </SynergyIconDefault>
  );
}

export default SynergyIcon;

const SynergyIconDefault = styled.div`
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: max-content;
    img {
      vertical-align: middle;
      height: 22px;
      width: 22px;
      margin-right: 10px;
    }
    span {
      color: white;
    }
  }
`;
