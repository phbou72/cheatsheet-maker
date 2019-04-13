import React, { useState } from "react";

import KeyStrokesForm from "./form/KeyStrokesForm";
import Sheet from "./sheet/Sheet";

import "./App.scss";

const App = () => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  return (
    <div className="app">
      <Sheet shortcuts={shortcuts} setShortcuts={setShortcuts} />
      <KeyStrokesForm
        shortcuts={shortcuts}
        onAddEvent={shortcut => setShortcuts([...shortcuts, shortcut])}
      />
    </div>
  );
};

export default App;
