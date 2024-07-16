import PropTypes from "prop-types";

import "./Button.css";

function Button({ text, type }) {
  return (
    <Button
      type={type}
      className="ambientivo-shortcode ambientivo-m  ambientivo-button ambientivo-layout--outlined   ambientivo-html--link"
    >
      <span className="ambientivo-m-text">{text}</span>
      <span className="ambientivo-m-corner ambientivo--top-left"></span>
      <span className="ambientivo-m-corner ambientivo--top-right"></span>
      <span className="ambientivo-m-corner ambientivo--bottom-left"></span>
      <span className="ambientivo-m-corner ambientivo--bottom-right"></span>
      <span className="ambientivo-m-btn-line ambientivo-btn-line--top"></span>
      <span className="ambientivo-m-btn-line ambientivo-btn-line--right"></span>
      <span className="ambientivo-m-btn-line ambientivo-btn-line--bottom"></span>
      <span className="ambientivo-m-btn-line ambientivo-btn-line--left"></span>
    </Button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
