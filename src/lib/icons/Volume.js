import React from "react";
import propTypes from "prop-types";

const Volume = props => {
  const style = {
    width: `${props.width}`
  };

  return (
    <svg
      className={`icon-itn message-icon ${props.svgClass}`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 459 459"
      aria-hidden={props.ariaHidden}
      focusable={props.focusable}
    >
      <path
        d="M0 153v153h102l127.5 127.5v-408L102 153H0zm344.25 76.5c0-45.9-25.5-84.15-63.75-102v204c38.25-17.85 63.75-56.1 63.75-102zM280.5 5.1v53.55C354.45 81.6 408 147.9 408 229.5s-53.55 147.9-127.5 170.85v53.55C382.5 430.95 459 339.15 459 229.5S382.5 28.05 280.5 5.1z"
        fill={props.fill}
      />
    </svg>
  );
};

Volume.propTypes = {
  width: propTypes.string,
  ariaHidden: propTypes.string,
  focusable: propTypes.string,
  fill: propTypes.string,
  svgClass: propTypes.string
};

Volume.defaultProps = {
  ariaHidden: "true",
  svgClass: "",
  focusable: "false",
  fill: "#30353a"
};

export default Volume;
