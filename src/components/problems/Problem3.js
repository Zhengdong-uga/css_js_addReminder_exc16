import { useState } from "react";

// Demonstrates caching state with local storage
// @todo store the click count in local storage (name it "clickCount") so if we refresh it still retains the value.
const Problem3 = () => {
  const storedCount = 
    localStorage.getItem('clickCount') ? Number(localStorage.getItem('clickCount')) : 0;
    // 👆 Do YOU EVEN EXIST?              👆 IF SO, BE A NUMBER!                      👆 IF NOT, BE 0
  const [count, setCount] = useState(storedCount);

  const clickHandler = () => {
    setCount((previousValue) => {
      const newValue = previousValue + 1;
      localStorage.setItem('clickCount', newValue);
      return newValue;
    });
    // When you have a state setter, if the arg is a function...
    // then what it returns is the new state value
    //
    // if you did localStorage.setItem('clickCount', newValue); here...
    // first... newValue does not exist here... but also
    // you are updating the localStorage before the state updates.
    // State updates are async
  };

  return (
    <>
      <h3>Wow! A click counter! Never seen that before...</h3>
      <button className="btn btn-primary btn-lg" onClick={clickHandler}>
        Number of clicks: {count}
      </button>
    </>
  );
};

export default Problem3;
