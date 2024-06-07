import { useDispatch } from "react-redux";

const Button = () => {
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch({type: "Increment"})
    }

    const handleDecrement = () => {
        dispatch({type: "Decrement"})
    }

    const handleReset = () => {
        dispatch({type: "Reset"})
    }
    return(
        <>
        <button onClick={handleIncrement} >Increment</button>
        <button onClick={handleDecrement} >Decrement</button>
        <button onClick={handleReset} >ResetCount</button>
        </>
    )
}

export default Button;