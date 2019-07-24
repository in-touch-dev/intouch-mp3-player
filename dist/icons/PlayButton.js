import React from "react";

var PlayButton = function PlayButton(props) {
  var style = {
    width: "".concat(props.width)
  };
  return React.createElement("svg", {
    className: "icon-itn message-icon ".concat(props.svgClass),
    style: style,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 124.512 124.512",
    "aria-hidden": props.ariaHidden,
    focusable: props.focusable
  }, React.createElement("path", {
    d: "M113.956,57.006l-97.4-56.2c-4-2.3-9,0.6-9,5.2v112.5c0,4.6,5,7.5,9,5.2l97.4-56.2   C117.956,65.105,117.956,59.306,113.956,57.006z",
    fill: props.fill
  }));
};

PlayButton.defaultProps = {
  ariaHidden: "true",
  svgClass: "",
  focusable: "false",
  fill: "#30353a"
};
export default PlayButton;