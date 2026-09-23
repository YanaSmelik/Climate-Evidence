import { useState, useEffect } from "react";
import Chart from "./Chart";
import styles from "../style/climateData.module.css";
import co2Banner from "../media/co2-banner.jpg";
import oceanBanner from "../media/ocean-banner.jpg";
import seaLevelBanner from "../media/sealevel-banner.jpg";
import temperatureBanner from "../media/temperature-banner.jpg";

function ClimateData(props) {
  const [globalCO2Data, setGlobalCO2Data] = useState([]);
  const [globalOceanTemperatureRise, setGlobalOceanTemperatureRise] = useState(
    [],
  );
  const [globalSeaLevelRise, setGlobalSeaLeveRise] = useState([]);
  const [globalTemperatureRise, setGlobalTemperatureRise] = useState([]);
  let fetchedData = [];

  const annualGlobalCO2url =
    "https://climatemonitor.info/api/public/v1/co2/annual_gl";
  const globalOceanTemperatureRiseUrl =
    "https://climatemonitor.info/api/public/v1/ohc/annual";
  const globalSeaLevelRiseUrl =
    "https://climatemonitor.info/api/public/v1/ocean/level";
  const globalTemperatureRiseUrl =
    "https://climatemonitor.info/api/public/v1/temp/annual_anomaly";

  const topicDescription = {
    CO2: 'Carbon dioxide is the workhorse of the greenhouse effect - not the strongest molecule, but by far the most abundant and the longest-lived, which is why it dominates the warming story. The Mauna Loa record began in 1958, when Charles Keeling started measuring from a Hawaiian volcano; the sawtooth "Keeling curve" it traced - the planet breathing in and out each year as northern forests leaf out and fall bare - is one of the most famous graphs in science.',
    oceanTempRise:
      "For one honest gauge of global warming, watch the ocean: more than nine-tenths of the extra heat trapped by greenhouse gases ends up in seawater, not the air. That is why ocean heat content - measured in zettajoules, a billion trillion joules apiece - is among the least noisy climate signals there is. The sea has a very long memory, and lately it breaks its own record almost every year.",
    seaLevelRise:
      "The sea rises for two reasons at once: water expands as it warms, and melting land ice pours in fresh volume. Satellites have tracked the global average from orbit since 1993, to within a few millimetres. A few millimetres a year sounds trivial - until you remember it is averaged across the whole ocean, and the rate has more than doubled since the record began",
    globalTempRise:
      "The surface temperature anomaly is the headline number - how much warmer the planet is than a mid-20th-century normal, land and ocean together. Anomalies are used instead of raw temperatures because a departure from average travels well: a mild winter in Siberia and a warm night in the tropics can be added up honestly. Every year since 2015 now ranks among the warmest on record.",
  };

  const banner = {
    CO2: co2Banner,
    oceanTempRise: oceanBanner,
    seaLevelRise: seaLevelBanner,
    globalTempRise: temperatureBanner,
  };

  const bannerText = {
    CO2: "Carbon Dioxide (CO2) Data",
    oceanTempRise: "Ocean Heat Data",
    seaLevelRise: "Sea Level Data",
    globalTempRise: "Global Temperature Data",
  }

  const bannerStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url(${banner[props.topic]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    width: '100%',
    paddingTop: '20%',
    color: 'white',
  };

  useEffect(() => {
    async function getData(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err.message);
      }
    }

    async function getAnnualGlobalCO2Data() {
      let response = await getData(annualGlobalCO2url);
      setGlobalCO2Data(response.data.readings);
    }

    async function getGlobalOceanTemperatureRiseData() {
      let response = await getData(globalOceanTemperatureRiseUrl);
      setGlobalOceanTemperatureRise(response.data.readings);
    }

    async function getSeaLevelRiseData() {
      let response = await getData(globalSeaLevelRiseUrl);
      setGlobalSeaLeveRise(processSeaLevelRiseData(response.data.readings));
    }

    async function getGlobalTemperatureRiseData() {
      let response = await getData(globalTemperatureRiseUrl);
      setGlobalTemperatureRise(response.data.readings);
    }

    function processSeaLevelRiseData(data) {
      let processedData = [];
      for (let i = 0; i < data.length - 1; i++) {
        const year = getYearFromData(data[i]);
        if (year !== getYearFromData(data[i + 1])) {
          processedData.push({ label: year, value: data[i].value });
        }
      }
      if (processedData.length > 0) {
        const lastProcessedItem = processedData[processedData.length - 1];
        const lastDataItem = data[data.length - 1];
        const lastYear = getYearFromData(lastDataItem);
        if (lastProcessedItem.year !== lastYear) {
          processedData.push({ label: lastYear, value: lastDataItem.value });
        }
      }
      return processedData;
    }

    function getYearFromData(item) {
      return item.label.substring(0, 4);
    }

    if (props.topic === "CO2") {
      getAnnualGlobalCO2Data();
    }
    if (props.topic === "oceanTempRise") {
      getGlobalOceanTemperatureRiseData();
    }
    if (props.topic === "seaLevelRise") {
      getSeaLevelRiseData();
    }
    if (props.topic === "globalTempRise") {
      getGlobalTemperatureRiseData();
    }
  }, [props.topic]);

  if (props.topic === "CO2") {
    fetchedData = globalCO2Data ?? [];
  }
  if (props.topic === "oceanTempRise") {
    fetchedData = globalOceanTemperatureRise ?? [];
  }
  if (props.topic === "seaLevelRise") {
    fetchedData = globalSeaLevelRise ?? [];
  }
  if (props.topic === "globalTempRise") {
    fetchedData = globalTemperatureRise ?? [];
  }
//TODO: fix flex item widths ratio of dataSection
  return (
    <div className={styles.mainSection}>

      <div style={bannerStyle}>

        <div className={styles["banner-content"]}>
          <h1>{bannerText[props.topic]}</h1>
        </div>
      </div>

      <div className={styles.dataSection}>
        <Chart className={styles.chartSection} data={fetchedData} topic={props.topic} />
        <div className={styles.descriptionSection}>
          <p>{topicDescription[props.topic]}</p>
        </div>
      </div>
    </div>
  );
}

export default ClimateData;
