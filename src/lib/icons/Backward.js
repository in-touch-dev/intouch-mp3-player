import React from "react";
import propTypes from "prop-types";

const Backward = props => {
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
        d="M260.2 21.3a9.93 9.93 0 0 0-10 0l-225.3 130c-2.687 1.574-4.496 4.31-4.898 7.398V10a10 10 0 1 0-20 0v300a10 10 0 1 0 20 0V161.2c.375 3.102 2.19 5.844 4.898 7.402L250.2 298.7a10.26 10.26 0 0 0 10 0 10.03 10.03 0 0 0 5-8.699V29.898a9.75 9.75 0 0 0-5-8.598zm0 0"
        fill={props.fill}
      />
    </svg>
  );
};

Backward.propTypes = {
  width: propTypes.string,
  ariaHidden: propTypes.string,
  focusable: propTypes.string,
  fill: propTypes.string,
  svgClass: propTypes.string
};

Backward.defaultProps = {
  ariaHidden: "true",
  svgClass: "",
  focusable: "false",
  fill: "#30353a"
};

export default Backward;
