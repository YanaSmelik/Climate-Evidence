import { useState } from "react";
import globalCO2Data from "./data/globalCO2Data";
import Topics from "./Topics";

function ClimateData() {
  const [topic, setTopic] = useState("");

  if (topic === "CO2") {
    const listDataByYears = globalCO2Data.map((yearData) => (
      <li key={yearData.year}>
        {yearData.year + ": " + yearData.cO2Tons + " t."}
      </li>
    ));
    return (
      <div>
        <h1>Climate Change Data</h1>
        <ul>{listDataByYears}</ul>
      </div>
    );
  }
  return (
    <div>
      <h1>Climate Change Data</h1>
      <Topics setTopic={setTopic}/>
    </div>
  );
}

export default ClimateData;
