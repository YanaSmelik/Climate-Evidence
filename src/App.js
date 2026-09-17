import './App.css';
import Home from './components/Home';
import ClimateData from './components/ClimateData';
import Sources from './components/Sources';
import Topics from './components/Topics';


// Add components for each Climate data, so it becomes a spa - each topis is a separate representation 
function App() {
  const [topic, setTopic] = useState("");
  return (
    <div>
   <Home />
    <Topics setTopic={setTopic} />
   <ClimateData />
   <Sources />
   </div>
  );
}

export default App;