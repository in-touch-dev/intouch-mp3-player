import React from "react";

var PauseButton = function PauseButton(props) {
  var style = {
    width: "".concat(props.width)
  };
  return React.createElement("svg", {
    className: "icon-itn message-icon ".concat(props.svgClass),
    style: style,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "-45 0 327 327",
    "aria-hidden": props.ariaHidden,
    focusable: props.focusable
  }, React.createElement("g", null, React.createElement("path", {
    d: "m158 0h71c4.417969 0 8 3.582031 8 8v311c0 4.417969-3.582031 8-8 8h-71c-4.417969 0-8-3.582031-8-8v-311c0-4.417969 3.582031-8 8-8zm0 0",
    fill: props.fill
  }), React.createElement("path", {
    d: "m8 0h71c4.417969 0 8 3.582031 8 8v311c0 4.417969-3.582031 8-8 8h-71c-4.417969 0-8-3.582031-8-8v-311c0-4.417969 3.582031-8 8-8zm0 0",
    fill: props.fill
  })));
};

PauseButton.defaultProps = {
  ariaHidden: "true",
  svgClass: "",
  focusable: "false",
  fill: "#30353a"
};
export default PauseButton;