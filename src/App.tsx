import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Tab, Tabs } from "@material-ui/core";
import { DraftEditor } from "./components/DraftEditor";
import { QuillEditor } from "./components/QuillEditor";
import { CodeMirrorEditor } from "./components/CodeMirrorEditor";

function App() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  return (
    <div className="App">
      <Tabs value={tabIndex} onChange={(_, newValue) => setTabIndex(newValue)}>
        <Tab value={0} label="draft" />
        <Tab value={1} label="quill" />
        <Tab value={2} label="codeMirror" />
      </Tabs>
      {tabIndex === 0 && <DraftEditor />}
      {tabIndex === 1 && <QuillEditor />}
      {tabIndex === 2 && <CodeMirrorEditor />}
    </div>
  );
}

export default App;
