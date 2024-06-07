import { useSelector } from "react-redux";

const DisplayCounter = () => {

    const counterObj = useSelector((store) => store.counter);
    const counter = counterObj.counterVal;
    return(
        <p>Current counter is :- {counter}</p>
    );
}

export default DisplayCounter; 