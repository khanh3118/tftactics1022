import ContentMainLayout from "../layouts/MainLayout";
import styled from "styled-components";

function ItemBuilder() {
  return (
    <ItemBuilderDefault id="item-builder">
      <ContentMainLayout
        nameContent="khanh"
        sideContent="manh"
        titleContent="son"
        mainContent="hoa"
      />
    </ItemBuilderDefault>
  );
}

export default ItemBuilder;

const ItemBuilderDefault = styled.div`

`
