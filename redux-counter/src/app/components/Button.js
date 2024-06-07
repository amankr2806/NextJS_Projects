import { useDispatch } from "react-redux";
import { counterActions } from "../store";

const Button = () => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    //dispatch({type: "Increment"})
    dispatch(counterActions.increment());
  };

  const handleDecrement = () => {
    //dispatch({type: "Decrement"})
    dispatch(counterActions.decrement());
  };

  const handleReset = () => {
    //dispatch({type: "Reset"})
    dispatch(counterActions.reset());
  };
  return (
    <>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleReset}>ResetCount</button>
    </>
  );
};

export default Button;
