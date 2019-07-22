import React from "react";
import propTypes from "prop-types";

const PlayButton = props => {
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
        d="M256 0C114.617 0 0 114.615 0 256s114.617 256 256 256 256-114.615 256-256S397.383 0 256 0zm88.48 269.57l-128 80A16.01 16.01 0 0 1 208 352a15.95 15.95 0 0 1-7.758-2.008C195.156 347.172 192 341.82 192 336V176c0-5.82 3.156-11.172 8.242-13.992 5.086-2.836 11.305-2.664 16.238.422l128 80A16.02 16.02 0 0 1 352 256c0 5.515-2.844 10.64-7.52 13.57z"
        fill={props.fill}
      />
    </svg>
  );
};

PlayButton.propTypes = {
  width: propTypes.string,
  ariaHidden: propTypes.string,
  focusable: propTypes.string,
  fill: propTypes.string,
  svgClass: propTypes.string
};

PlayButton.defaultProps = {
  ariaHidden: "true",
  svgClass: "",
  focusable: "false",
  fill: "#30353a"
};

export default PlayButton;
