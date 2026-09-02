import { useState, useEffect } from "react";
import globalTemperatureRise from "../data/globalTemperatureRise";
import Topics from "./Topics";

function ClimateData() {
  const [globalCO2Data, setGlobalCO2Data] = useState([]);
  const [globalOceanTemperatureRise, setGlobalOceanTemperatureRise] = useState(
    [],
  );
  const [globalSeaLevelRise, setGlobalSeaLeveRise] = useState([]);
  const [topic, setTopic] = useState("");
  let listDataByYears = [];
  const annualGlobalCO2url =
    "https://climatemonitor.info/api/public/v1/co2/annual_gl";
  const globalOceanTemperatureRiseUrl =
    "https://climatemonitor.info/api/public/v1/ohc/annual";
  const globalSeaLevelRiseUrl = "https://climatemonitor.info/api/public/v1/ocean/level";
  const topicDescription = {
    CO2: 'Carbon dioxide is the workhorse of the greenhouse effect - not the strongest molecule, but by far the most abundant and the longest-lived, which is why it dominates the warming story. The Mauna Loa record began in 1958, when Charles Keeling started measuring from a Hawaiian volcano; the sawtooth "Keeling curve" it traced - the planet breathing in and out each year as northern forests leaf out and fall bare - is one of the most famous graphs in science.',
    oceanTempRise:
      "For one honest gauge of global warming, watch the ocean: more than nine-tenths of the extra heat trapped by greenhouse gases ends up in seawater, not the air. That is why ocean heat content - measured in zettajoules, a billion trillion joules apiece - is among the least noisy climate signals there is. The sea has a very long memory, and lately it breaks its own record almost every year.",
    seaLevelRise:
      "Yearly change in global mean sea level, as measured by satellite altimetry, from xxxx to xxxx",
    globalTempRise: "Yearly surface temperature rise from xxxx to xxxx",
  };

  async function getData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getAnnualGlobalCO2Data() {
    let temp = await getData(annualGlobalCO2url);
    setGlobalCO2Data(temp.data.readings);
  }

  async function getGlobalOceanTemperatureRiseData() {
    let temp = await getData(globalOceanTemperatureRiseUrl);
    setGlobalOceanTemperatureRise(temp.data.readings);
  }

  async function getSeaLevelRiseData() {
    let temp = await getData(globalSeaLevelRiseUrl);
    setGlobalSeaLeveRise(temp.data.readings);
    console.log(globalSeaLevelRise);
    processSeaLevelRiseData(globalSeaLevelRise);

  }

  function processSeaLevelRiseData(data) {
    let processedData = [];
    for (let i = 0; i < data.length - 1; i++) {
      const year = getYearFromData(data[i]);
      if (year !== getYearFromData(data[i + 1])) {
        processedData.push({ "year": year, "value": data[i].value });
      }
    }
    if (processedData.length > 0) {
      const lastProcessedItem = processedData[processedData.length - 1];
      const lastDataItem =  data[data.length - 1];
      const lastYear = getYearFromData(lastDataItem);
      if (lastProcessedItem.year !== lastYear) {
        processedData.push({"year": lastYear, "value": lastDataItem.value});
      }
    }
    return processedData;
  }

  function getYearFromData(item) {
    return item.label.substring(0, 4);
  }

  useEffect(() => {
    if (topic === "CO2") getAnnualGlobalCO2Data();
    if (topic === "oceanTempRise") getGlobalOceanTemperatureRiseData();
    if (topic === "seaLevelRise") getSeaLevelRiseData();
  }, [topic]);

  if (topic === "CO2") {
    listDataByYears = globalCO2Data.map((yearData) => (
      <li key={yearData.label}>
        {yearData.label + ": " + yearData.value + " ppm"}
      </li>
    ));
  }
  if (topic === "oceanTempRise") {
    listDataByYears = globalOceanTemperatureRise.map((yearData) => (
      <li key={yearData.label}>
        {yearData.label + ": " + yearData.value + " ZJ"}
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
