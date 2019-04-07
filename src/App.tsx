import React from "react";

import KeyStrokesForm from "./KeyStrokesForm";
import Sheet from "./Sheet";

import "./App.scss";
const onAddEvent = (description: string, keyStrokes: string) => {
  console.log(description, keyStrokes);
};

const App = () => (
  <div className="app">
    <Sheet />
    <KeyStrokesForm onAddEvent={onAddEvent} />
  </div>
);

export default App;
