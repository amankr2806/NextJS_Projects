import { useSelector } from "react-redux";

const DisplayCounter = () => {

    const counter = useSelector((store) => store.count);
    return(
        <p>Current counter is :- {counter}</p>
    );
}

export default DisplayCounter; 