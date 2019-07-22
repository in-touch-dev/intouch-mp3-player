import React from "react";
import propTypes from "prop-types";

const Playlist = props => {
  const style = {
    width: `${props.width}`
  };

  return (
    <svg
      className={`icon-itn message-icon ${props.svgClass}`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60.123 60.123"
      aria-hidden={props.ariaHidden}
      focusable={props.focusable}
      fill={props.fill}
    >
      <path
        d="M57.124 51.893H16.92a3 3 0 1 1 0-6h40.203a3 3 0 0 1 .001 6zm0-18.83H16.92a3 3 0 0 1 0-6h40.203a3 3 0 0 1 .001 6zm0-18.832H16.92a3 3 0 1 1 0-6h40.203a3 3 0 0 1 .001 6z"/><circle cx="4.029" cy="11.463" r="4.029"/><circle cx="4.029" cy="30.062" r="4.029"/><circle cx="4.029" cy="48.661" r="4.029"
      />
    </svg>
  );
};

Playlist.propTypes = {
  width: propTypes.string,
  ariaHidden: propTypes.string,
  focusable: propTypes.string,
  fill: propTypes.string,
  svgClass: propTypes.string
};

Playlist.defaultProps = {
  ariaHidden: "true",
  svgClass: "",
  focusable: "false",
  fill: "#30353a"
};

export default Playlist;
