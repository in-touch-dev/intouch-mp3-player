import React from "react";

var Hide = function Hide(props) {
  var style = {
    width: "".concat(props.width)
  };
  return React.createElement("svg", {
    className: "icon-itn message-icon ".concat(props.svgClass),
    style: style,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 511.997 511.997",
    "aria-hidden": props.ariaHidden,
    focusable: props.focusable
  }, React.createElement("path", {
    d: "M508.872 478.706L33.292 3.124a10.67 10.67 0 0 0-15.086 0L3.125 18.206c-4.167 4.165-4.167 10.92 0 15.085l88.207 88.21C49.216 154.827 17.378 200.26.5 252.74a10.72 10.72 0 0 0 0 6.52C36.8 372.156 139.467 448 256 448c45.58 0 89.4-11.55 128.546-33.288l94.16 94.16a10.67 10.67 0 0 0 15.086 0l15.08-15.082a10.67 10.67 0 0 0-.001-15.085zM256 405.333c-82.344 0-149.333-67-149.333-149.333 0-32.414 10.66-63.68 29.86-89.3l46.375 46.376c-7.676 12.887-12.234 27.445-12.234 42.932 0 47.052 38.28 85.333 85.333 85.333 15.487 0 30.046-4.56 42.932-12.234l46.375 46.375c-25.628 19.2-56.893 29.86-89.307 29.86zm-9-228.053a10.68 10.68 0 0 0 2.292 11.677l73.75 73.75a10.66 10.66 0 0 0 7.542 3.125 10.63 10.63 0 0 0 4.135-.833c4-1.688 6.583-5.615 6.53-9.958-.53-46.74-37.552-83.76-84.292-84.292-4.25.458-8.27 2.53-9.958 6.53zm-67.387-58c3.198 3.208 8.083 4.02 12.146 2.083 20.375-9.75 42-14.698 64.24-14.698 82.344 0 149.333 67 149.333 149.333 0 22.25-4.948 43.865-14.698 64.24-1.948 4.083-1.115 8.948 2.083 12.146l36.97 36.97a10.66 10.66 0 0 0 7.542 3.125h.02a10.72 10.72 0 0 0 7.563-3.156c30.313-30.615 53.375-68.677 66.677-110.063a10.72 10.72 0 0 0 0-6.52C475.208 139.843 372.53 64 256 64c-31.98 0-63.406 5.687-93.417 16.917-3.396 1.27-5.917 4.177-6.688 7.73a10.67 10.67 0 0 0 2.885 9.802l20.834 20.834z",
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