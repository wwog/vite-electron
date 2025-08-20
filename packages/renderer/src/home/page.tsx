import { useState, type FC } from "react";

export const HomePage: FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>Current Count = {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
