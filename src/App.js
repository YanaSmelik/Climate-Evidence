import Home from "./components/Home";
import ClimateData from "./components/ClimateData";
import Sources from "./components/Sources";
import Topics from "./components/Topics";
import { useState } from "react";
import styles from "./style/app.module.css";

function App() {
  const [topic, setTopic] = useState("");
  return (
    <div className={styles.appSection}>
      <div className={styles.homeSection}>
        <Home />
      </div>

      <div className={styles.mainSection}>
        <div className={styles.topicsSection}>
          <Topics setTopic={setTopic} />
        </div>
        <div className={styles.climateDataSection}>
          <ClimateData topic={topic} />
        </div>
      </div>

      <div className={styles.sourcesSection}>
        <Sources />
      </div>
    </div>
  );
}

export default App;
