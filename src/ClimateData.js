import { useState } from "react";
import globalCO2Data from "./data/globalCO2Data";
import globalOceanTemperatureRise from "./data/globalOceanTemperatureRise";
import globalSeaLevelRise from "./data/globalSeaLevelRise";
import globalTemperatureRise from "./data/globalTemperatureRise";
import Topics from "./Topics";

function ClimateData() {
  const [topic, setTopic] = useState("");
  let listDataByYears = [];
   const topicDescription = {
    CO2: 'Average carbon dioxide (CO₂) levels in the atmosphere worldwide from xxxx to xxxx',
    oceanTempRise: 'Yearly global average sea surface temperature rise from xxxx to xxxx (in degrees Celsius)',
    seaLevelRise: 'Yearly change in global mean sea level, as measured by satellite altimetry, from xxxx to xxxx',
    globalTempRise: 'Yearly surface temperature rise from xxxx to xxxx'
  }

  if (topic === "CO2") {
    listDataByYears = globalCO2Data.map((yearData) => (
      <li key={yearData.year}>
        {yearData.year + ": " + yearData.cO2Tons + " t."}
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
