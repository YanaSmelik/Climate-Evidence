import { CartesianGrid, Line, Legend, LineChart, XAxis, YAxis } from 'recharts';

export default function Step1(props) {
    console.log(props.data);
    return (
        <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }} responsive data={props.data}>
            <CartesianGrid />
            <Line dataKey="value" />
            <XAxis dataKey="label"/>
            <YAxis />
            <Legend />
        </LineChart>
    );
}