import React from "react";
import propTypes from "prop-types";

const Hide = props => {
  const style = {
    width: `${props.width}`
  };

  return (
    <svg
      className={`icon-itn message-icon ${props.svgClass}`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 245.059 245.059"
      aria-hidden={props.ariaHidden}
      focusable={props.focusable}
    >
      <path d="M217.774 121.224l-95.252 84.224-95.22-84.224a16 16 0 0 0-22.597 0c-6.23 6.23-6.23 16.368 0 22.566l106.312 94.044c3.178 3.2 7.342 4.704 11.505 4.64 4.164.095 8.327-1.398 11.505-4.545l106.344-94.044c6.198-6.23 6.198-16.4 0-22.597-6.26-6.26-16.4-6.293-22.597-.064zm-106.8 2.67c3.178 3.178 7.342 4.704 11.505 4.64 4.164.064 8.36-1.462 11.505-4.64L240.307 29.85c6.325-6.23 6.325-16.336.064-22.597-6.23-6.23-16.4-6.23-22.597 0l-95.252 84.224L27.3 7.252c-6.26-6.23-16.4-6.23-22.63 0a16 16 0 0 0 0 22.597l106.312 94.045z" fill={props.fill}/>
    </svg>
  );
};

Hide.propTypes = {
  width: propTypes.string,
  ariaHidden: propTypes.string,
  focusable: propTypes.string,
  fill: propTypes.string,
  svgClass: propTypes.string
};

Hide.defaultProps = {
  ariaHidden: "true",
  svgClass: "",
  focusable: "false",
  fill: "#30353a"
};

export default Hide;
