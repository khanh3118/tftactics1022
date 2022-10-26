import './Itembuilder.scss';
import ContentMainLayout from '../layouts/ContentMainLayout';

function ItemBuilder() {
  return (
    <div id="item-builder">
      <ContentMainLayout 
        nameContent="khanh"
        sideContent="manh"
        titleContent="son"
        mainContent="hoa"
      />
    </div>
  );
}

export default ItemBuilder;