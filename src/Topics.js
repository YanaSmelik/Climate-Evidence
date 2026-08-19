
function Topics(props) {

    return (
        <button onClick={(event) => {props.setTopic(event.target.name)}} name='CO2'>CO2 Data</button>
    );

}

export default Topics;