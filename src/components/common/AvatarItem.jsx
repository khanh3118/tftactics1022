import styled from "styled-components";
import { DataContext } from "contexts/DataContext";
import { useContext } from "react";

export default function AvatarItem(props) {
  const { itemsData } = useContext(DataContext);

  const itemDetail = itemsData.find(
    (item) => item.item_name.toLowerCase() === props.name.toLowerCase()
  );

  return (
    <AvatarItemDefault onClick={props.hanleClick} className={props.className}>
      <Wrapper width={props.width} height={props.height}>
        <img className="avatar-item-img" src={itemDetail.item_image} alt="" />
      </Wrapper>
    </AvatarItemDefault>
  );
}

const AvatarItemDefault = styled.div``;
const Wrapper = styled.div`
  .avatar-item-img {
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid #17313a;
    width: ${(props) => props.width} !important;
    height: ${(props) => props.height} !important;
    &:hover {
      border-color: #d47559;
    }
  }
`;
