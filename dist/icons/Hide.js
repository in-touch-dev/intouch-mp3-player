import React from "react";

var Hide = function Hide(props) {
  var style = {
    width: "".concat(props.width)
  };
  return React.createElement("svg", {
    className: "icon-itn message-icon ".concat(props.svgClass),
    style: style,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 245.059 245.059",
    "aria-hidden": props.ariaHidden,
    focusable: props.focusable
  }, React.createElement("path", {
    d: "M217.774 121.224l-95.252 84.224-95.22-84.224a16 16 0 0 0-22.597 0c-6.23 6.23-6.23 16.368 0 22.566l106.312 94.044c3.178 3.2 7.342 4.704 11.505 4.64 4.164.095 8.327-1.398 11.505-4.545l106.344-94.044c6.198-6.23 6.198-16.4 0-22.597-6.26-6.26-16.4-6.293-22.597-.064zm-106.8 2.67c3.178 3.178 7.342 4.704 11.505 4.64 4.164.064 8.36-1.462 11.505-4.64L240.307 29.85c6.325-6.23 6.325-16.336.064-22.597-6.23-6.23-16.4-6.23-22.597 0l-95.252 84.224L27.3 7.252c-6.26-6.23-16.4-6.23-22.63 0a16 16 0 0 0 0 22.597l106.312 94.045z",
    fill: props.fill
  }));
};

Hide.defaultProps = {
  ariaHidden: "true",
  svgClass: "",
  focusable: "false",
  fill: "#30353a"
};
export default Hide;