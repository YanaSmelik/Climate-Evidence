import './App.css';
import Home from './components/Home';
import ClimateData from './components/ClimateData';
import Sources from './components/Sources';
import Step1 from './components/charts/ChartCO2';


//TODO: add recharts support or similar 
// Add components for each Climate data, so it becomes a spa - each topis is a separate representation 
function App() {
  return (
    <div>
   <Home />
   <Step1 />
   <ClimateData />
   <Sources />
   </div>
  );
}

export default App;
