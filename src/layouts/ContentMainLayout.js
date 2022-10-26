import "./ContentMainLayout.scss";

function ContentLayout(props) {
  return (
    <div id="content-layout-default">
      <div className="wrapper">
        <div className="navigation">
          <div className="title">
            {props.nameContent}
          </div>
          {props.sideContent}
        </div>
        <div className="content">
          {props.titleContent}
          {props.mainContent}
        </div>
      </div>
    </div>
  );
}

export default ContentLayout;
