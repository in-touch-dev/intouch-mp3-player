import React from "react";
import propTypes from "prop-types";

const PauseButton = props => {
  const style = {
    width: `${props.width}`
  };

  return (
    <svg
      className={`icon-itn message-icon ${props.svgClass}`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      aria-hidden={props.ariaHidden}
      focusable={props.focusable}
    >
      <path
        d="M255 0C114.75 0 0 114.75 0 255s114.75 255 255 255 255-114.75 255-255S395.25 0 255 0zm-25.5 357h-51V153h51v204zm102 0h-51V153h51v204z"
        fill={props.fill}
      />
    </svg>
  );
};

PauseButton.propTypes = {
  width: propTypes.string,
  ariaHidden: propTypes.string,
  focusable: propTypes.string,
  fill: propTypes.string,
  svgClass: propTypes.string
};

PauseButton.defaultProps = {
  ariaHidden: "true",
  svgClass: "",
  focusable: "false",
  fill: "#30353a"
};

export default PauseButton;
