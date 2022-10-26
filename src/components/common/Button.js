import './Button.scss';

function Button(props) {
  return (
    <div id='defaul-button' className={props.className}>
      <span>{props.btnText}</span>
    </div>
  );
}

export default Button;