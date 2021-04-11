import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/Root";

if (module.hot) {
  module.hot.accept();
}

var root = document.getElementById("root");
ReactDOM.render(<Root/>, root);
