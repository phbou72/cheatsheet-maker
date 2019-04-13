import React, { useState } from "react";

import KeyStrokesForm from "./form/KeyStrokesForm";
import Sheet from "./sheet/Sheet";

import "./App.scss";

const App = () => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  return (
    <div className="app">
      <Sheet items={shortcuts} />
      <KeyStrokesForm onAddEvent={shortcut => setShortcuts([...shortcuts, shortcut])} />
    </div>
  );
};

export default App;
