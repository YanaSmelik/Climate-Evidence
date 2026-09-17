import styles from '../style/topics.module.css';

function Topics(props) {
  let topicButtons = [
    {
      nameAttribute: "CO2",
      buttonName: "CO2 Data",
    },
    {
      nameAttribute: "oceanTempRise",
      buttonName: "Ocean temperature rise",
    },
    {
      nameAttribute: "seaLevelRise",
      buttonName: "Sea level rise",
    },
    {
      nameAttribute: "globalTempRise",
      buttonName: "Global temperature rise",
    },
  ];

  const topicButtonsJSX = topicButtons.map((topic) => {
    return (
      <button key={topic.nameAttribute}
        onClick={(event) => {
          props.setTopic(event.target.name);
        }}
        name={topic.nameAttribute}
      >
        {topic.buttonName}
      </button>
    );
  });

  return (
    <div>
    <ul  className={styles.sideBar}>
     {topicButtonsJSX}
     </ul>
    </div>
  );
}

export default Topics;
