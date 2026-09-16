import './App.css';
import Home from './components/Home';
import ClimateData from './components/ClimateData';
import Sources from './components/Sources';


//TODO: add recharts support or similar 
// Add components for each Climate data, so it becomes a spa - each topis is a separate representation 
function App() {
  return (
    <div>
   <Home />
   <ClimateData />
   <Sources />
   </div>
  );
}

export default App;
