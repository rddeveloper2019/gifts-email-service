import React from "react";
import { hydrateRoot } from "react-dom/client";
import { App } from "src/views/app/App";

const element = document.getElementById("interactive-content");

try {
  if (element) {
    hydrateRoot(element, <App />);
  }
} catch (error) {
  console.log("(**)=> error: ", error);
}
