import React from "react";
import {createRoot} from "react-dom/client";
import App from "./Components/App.jsx";

// ReactDOM.render(<App />, document.getElementById("root"));

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App tab="home" />);

