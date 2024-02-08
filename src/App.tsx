import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", { class: "text-xl" }, "Hello World"),
    React.createElement("p", {}, "This is a paragraph"),
  ]);
};

const container = document.getElementById("root");
const root = createRoot(container as Element);
root.render(React.createElement(App));
