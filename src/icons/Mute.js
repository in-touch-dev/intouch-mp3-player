import React from "react";
import propTypes from "prop-types";

const Mute = props => {
  const style = {
    width: `${props.width}`
  };

  return (
    <svg
      className={`icon-itn message-icon ${props.svgClass}`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 461.55 461.55"
      aria-hidden={props.ariaHidden}
      focusable={props.focusable}
    >
      <path
        d="M345.525 229.5c0-45.9-25.5-84.15-63.75-102v56.1l63.75 63.75V229.5zm63.75 0c0 22.95-5.1 45.9-12.75 66.3l38.25 38.25c17.85-30.6 25.5-68.85 25.5-107.1 0-109.65-76.5-201.45-178.5-224.4V56.1c73.95 25.5 127.5 91.8 127.5 173.4zM34.425 0L1.275 33.15 121.125 153H1.275v153h102l127.5 127.5V262.65l109.65 109.65c-17.85 12.75-35.7 22.95-58.65 30.6v53.55c35.7-7.65 66.3-22.95 94.35-45.9l51 51 33.15-33.15-229.5-229.5L34.425 0zm196.35 25.5l-53.55 53.55 53.55 53.55V25.5z"
        fill={props.fill}
      />
    </svg>
  );
};

Mute.propTypes = {
  width: propTypes.string,
  ariaHidden: propTypes.string,
  focusable: propTypes.string,
  fill: propTypes.string,
  svgClass: propTypes.string
};

Mute.defaultProps = {
  ariaHidden: "true",
  svgClass: "",
  focusable: "false",
  fill: "#30353a"
};

export default Mute;
