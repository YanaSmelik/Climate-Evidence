import { CartesianGrid, Line, Legend, LineChart, XAxis, YAxis, Tooltip } from 'recharts';

const topicsDomainValues = [
    {
        "topic": "CO2",
        "domainValues": [300, 450]
    },
     {
        "topic": "oceanTempRise",
        "domainValues": [-200, 300]
    },
     {
        "topic": "seaLevelRise",
        "domainValues": [-100, 100]
    },
     {
        "topic": "globalTempRise",
        "domainValues": [-0.6, 1.6]
    },
]

 function Chart(props) {

    //TODO: adjust chart y axis domain for each topic
    //TODO: adjust x axis tick for each topic
    return (
        <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }} responsive data={props.data} margin={{
            top: 20,
            right: 20,
            bottom: 5,
            left: 0,
        }}>
            <CartesianGrid strokeDasharray="5 5"/>
            <Line dataKey="value" type="monotone" strokeWidth={2} name="My data series name"/>
            <XAxis dataKey="label" />
            <YAxis label={{ value: 'UV', position: 'insideLeft', angle: -90 }} domain={[-0.6, 1.6]}/>
            <Legend position="insideBottomRight"  />
            <Tooltip />
        </LineChart>
    );
}

 export default Chart;