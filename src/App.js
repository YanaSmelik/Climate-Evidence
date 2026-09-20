import './App.css';
import Home from './components/Home';
import ClimateData from './components/ClimateData';
import Sources from './components/Sources';
import Topics from './components/Topics';
import { useState } from "react";


function App() {
  const [topic, setTopic] = useState("");
  return (
    <div>
   <Home />
    <Topics setTopic={setTopic} />
   <ClimateData topic={topic}/>
   <Sources />
   </div>
  );
}

export default App;