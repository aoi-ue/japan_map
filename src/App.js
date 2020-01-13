import React, {useState} from 'react';
import ReactTooltip from "react-tooltip";

import JapanMap from './JapanMap'; 
import Table from './Table'; 


function App() {
  const [content, setContent] = useState("");
  console.log(content)

  return (
    <div className="App">
      <JapanMap setTooltipContent={setContent}/ >
      <ReactTooltip>{content}</ReactTooltip>
      <Table content={content}/>
    </div>
  );
}

export default App;
