import React, {useState} from 'react';
import ReactTooltip from "react-tooltip";
import "./App.css"; 

import JapanMap from './JapanMap'; 
import Table from './Table'; 


function App() {
  const [content, setContent] = useState("");

  return (
    <div className="App">
      <JapanMap setTooltipContent={setContent}/ >
      <ReactTooltip>{content}</ReactTooltip>
      <Table content={content}/>
    </div>
  );
}

export default App;
