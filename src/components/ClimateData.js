import { useState, useEffect } from "react";
// import globalCO2Data from "../data/globalCO2Data";
import globalOceanTemperatureRise from "../data/globalOceanTemperatureRise";
import globalSeaLevelRise from "../data/globalSeaLevelRise";
import globalTemperatureRise from "../data/globalTemperatureRise";
import Topics from "./Topics";

function ClimateData() {
  const[globalCO2Data, setGlobalCO2Data] = useState([]);
  const [topic, setTopic] = useState("");
  let listDataByYears = [];
   const annualGlobalCO2url = 'https://climatemonitor.info/api/public/v1/co2/annual_gl';
   const topicDescription = {
    CO2: 'Average carbon dioxide (CO₂) levels in the atmosphere worldwide from xxxx to xxxx',
    oceanTempRise: 'Yearly global average sea surface temperature rise from xxxx to xxxx (in degrees Celsius)',
    seaLevelRise: 'Yearly change in global mean sea level, as measured by satellite altimetry, from xxxx to xxxx',
    globalTempRise: 'Yearly surface temperature rise from xxxx to xxxx'
  }

  // useEffect(() => {
  //   getAnnualGlobalCO2Data();
  // }, []); 

   async function getAnnualGlobalCO2Data() {
    let temp = await getData(annualGlobalCO2url);
      setGlobalCO2Data(temp.data.readings);
      // console.log(temp.data.readings);
      console.log(globalCO2Data);
  }

  async function getData(url){
    try{
      const response = await fetch(url);
      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      return result;
    }catch(err) {
      console.log(err.message);
    }
  }

  if (topic === "CO2") {
    getAnnualGlobalCO2Data();
    listDataByYears = globalCO2Data.map((yearData) => ( // ERROR: Cannot read properties of undefined (reading 'readings')
      <li key={yearData.label}>
        {yearData.label + ": " + yearData.value + " t."}
      </li>
    ));
  }
  if (topic === "oceanTempRise") {
    listDataByYears = globalOceanTemperatureRise.map((yearData) => (
      <li key={yearData.year}>
        {yearData.year + ": " + yearData.temperatureRise + " cm"}
      </li>
    ));
  }
  if (topic === "seaLevelRise") {
    listDataByYears = globalSeaLevelRise.map((yearData) => (
      <li key={yearData.year}>
        {yearData.year + ": " + yearData.seaLevelRise + " cm"}
      </li>
    ));
  }
  if (topic === "globalTempRise") {
    listDataByYears = globalTemperatureRise.map((yearData) => (
      <li key={yearData.year}>
        {yearData.year + ": " + yearData.temperatureRise + " °C"}
      </li>
    ));
  }

  return (
    <div>
      <h1>Climate Change Data</h1>
      <Topics setTopic={setTopic} />
      <p>{topicDescription[topic]}</p>
      <ul>{listDataByYears}</ul>
    </div>
  );
}

export default ClimateData;
