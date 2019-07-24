import React from "react";
import propTypes from "prop-types";

const Forward = props => {
  const style = {
    width: `${props.width}`
  };

  return (
    <svg
      className={`icon-itn message-icon ${props.svgClass}`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-27 0 320 320"
      aria-hidden={props.ariaHidden}
      focusable={props.focusable}
    >
      <path
        d="M255.2 0a10.03 10.03 0 0 0-10 10v148.8c-.375-3.102-2.19-5.844-4.898-7.402L15 21.3a9.93 9.93 0 0 0-10 0A10.03 10.03 0 0 0 0 30v260.2a10.03 10.03 0 0 0 5 8.699 10.26 10.26 0 0 0 10 0L240.3 168.8a10.08 10.08 0 0 0 4.898-7.402V310a10 10 0 1 0 20 0V10a10.03 10.03 0 0 0-10-10zm0 0"
        fill={props.fill}
      />
    </svg>
  );
};

Forward.propTypes = {
  width: propTypes.string,
  ariaHidden: propTypes.string,
  focusable: propTypes.string,
  fill: propTypes.string,
  svgClass: propTypes.string
};

Forward.defaultProps = {
  ariaHidden: "true",
  svgClass: "",
  focusable: "false",
  fill: "#30353a"
};

export default Forward;
