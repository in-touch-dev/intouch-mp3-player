import React from "react";

var Playlist = function Playlist(props) {
  var style = {
    width: "".concat(props.width)
  };
  return React.createElement("svg", {
    className: "icon-itn message-icon ".concat(props.svgClass),
    style: style,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 60.123 60.123",
    "aria-hidden": props.ariaHidden,
    focusable: props.focusable,
    fill: props.fill
  }, React.createElement("path", {
    d: "M57.124 51.893H16.92a3 3 0 1 1 0-6h40.203a3 3 0 0 1 .001 6zm0-18.83H16.92a3 3 0 0 1 0-6h40.203a3 3 0 0 1 .001 6zm0-18.832H16.92a3 3 0 1 1 0-6h40.203a3 3 0 0 1 .001 6z"
  }), React.createElement("circle", {
    cx: "4.029",
    cy: "11.463",
    r: "4.029"
  }), React.createElement("circle", {
    cx: "4.029",
    cy: "30.062",
    r: "4.029"
  }), React.createElement("circle", {
    cx: "4.029",
    cy: "48.661",
    r: "4.029"
  }));
};

Playlist.defaultProps = {
  ariaHidden: "true",
  svgClass: "",
  focusable: "false",
  fill: "#30353a"
};
export default Playlist;