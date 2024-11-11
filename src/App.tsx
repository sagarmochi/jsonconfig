/* eslint-disable @typescript-eslint/no-explicit-any */
// App.tsx

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MasterJSONViewer from "./components/MasterJSONViewer";
import NewJSONBuilder from "./components/NewJSONBuilder";
import Editor from '@monaco-editor/react';


const sampleJson: any = {
  id: "0001",
  type: "donut",
  name: "Cake",
  ppu: 0.55,
  batters: {
    batter: { id: "1001", type: { name: "test", pop: true } },
    topping: [ 
      {
        firstname : '',
        lastname : '',
        age : ''
      }
    ] ,
  },
};

const updatedJson = `const data = ${JSON.stringify(sampleJson)}`

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div style={{ fontWeight : "bold"}}>JSON Key Picker</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100vw",
          }}
        >
          <Editor height="90vh" width="400px" options={{wordWrap : 'on',autoIndent : 'full'}} defaultLanguage="javascript" defaultValue={updatedJson}  />
          <MasterJSONViewer jsonData={sampleJson} />
          <NewJSONBuilder />
          
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
