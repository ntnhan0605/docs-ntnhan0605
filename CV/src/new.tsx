import { useState } from 'react';
export default function Counter() {
  const [counter, setCounter] = useState(5);
  return (
    <>
      <span>{counter}</span>
      <button
        onClick={() => {
          setCounter(counter + 5); // 10
          setCounter(counter + 5); // 15
          alert(counter);
          setCounter((counter) => counter + 5);
          setCounter((counter) => counter + 5);
        }}
      >
        Increment
      </button>
    </>
  );
}
