import "./Content.scss";

function Content(props) {
  return (
    <div id="content-default">
      <div className="wrapper">
        <a className="version-update" href="/">
          <div className="update-title">
            Set 7.5 Update is now live on TFTactics!
          </div>
          <div className="update-subtitle">Click here to learn more</div>
        </a>
        {props.children}
      </div>
    </div>
  );
}

export default Content;
