import {
  CartesianGrid,
  Line,
  Legend,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
} from "recharts";

const topicsDomainValues = [
  {
    topic: "CO2",
    domainValues: [300, 450],
  },
  {
    topic: "oceanTempRise",
    domainValues: [-200, 300],
  },
  {
    topic: "seaLevelRise",
    domainValues: [-100, 100],
  },
  {
    topic: "globalTempRise",
    domainValues: [-0.6, 1.6],
  },
];

const defaultTopicDomainValues = [0, "auto"];

function Chart(props) {
  let domainValue =
    topicsDomainValues.find((obj) => obj.topic === props.topic)?.domainValues ??
    defaultTopicDomainValues;

  return (
    <LineChart
      style={{ width: "100%", aspectRatio: 1.618, maxWidth: 1000 }}
      responsive
      data={props.data}
      margin={{
        top: 20,
        right: 20,
        bottom: 5,
        left: 0,
      }}
    >
      <CartesianGrid strokeDasharray="5 5" />
      <Line
        dataKey="value"
        type="monotone"
        strokeWidth={2}
        name="My data series name"
      />
      <XAxis dataKey="label" interval="preserveStartEnd" />
      <YAxis
        label={{ value: "UV", position: "insideLeft", angle: -90 }}
        domain={domainValue}
      />
      <Legend position="insideBottomRight" />
      <Tooltip />
      <Brush dataKey="time" height={30} startIndex={0} endIndex={100} />
    </LineChart>
  );
}

export default Chart;
