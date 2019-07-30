import React from "react";
import propTypes from "prop-types";

const Close = props => {
  const style = {
    width: `${props.width}`
  };

  return (
    <svg
      className={`icon-itn message-icon ${props.svgClass}`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21.9 21.9"
      aria-hidden={props.ariaHidden}
      focusable={props.focusable}
    >
      <path
        d="M14.1 11.3c-.2-.2-.2-.5 0-.7l7.5-7.5a1.08 1.08 0 0 0 .3-.7 1.08 1.08 0 0 0-.3-.7L20.2.3a1.08 1.08 0 0 0-.7-.3c-.3 0-.5.1-.7.3l-7.5 7.5c-.2.2-.5.2-.7 0L3.1.3a1.08 1.08 0 0 0-.7-.3 1.08 1.08 0 0 0-.7.3L.3 1.7a1.08 1.08 0 0 0-.3.7 1.08 1.08 0 0 0 .3.7l7.5 7.5c.2.2.2.5 0 .7L.3 18.8a1.08 1.08 0 0 0-.3.7 1.08 1.08 0 0 0 .3.7l1.4 1.4a1.08 1.08 0 0 0 .7.3 1.08 1.08 0 0 0 .7-.3l7.5-7.5c.2-.2.5-.2.7 0l7.5 7.5a1.08 1.08 0 0 0 .7.3 1.08 1.08 0 0 0 .7-.3l1.4-1.4a1.08 1.08 0 0 0 .3-.7 1.08 1.08 0 0 0-.3-.7l-7.5-7.5z"
        fill={props.fill}
      />
    </svg>
  );
};

Close.propTypes = {
  width: propTypes.string,
  ariaHidden: propTypes.string,
  focusable: propTypes.string,
  fill: propTypes.string,
  svgClass: propTypes.string
};

Close.defaultProps = {
  ariaHidden: "true",
  svgClass: "",
  focusable: "false",
  fill: "#30353a"
};

export default Close;
