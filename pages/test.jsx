import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [isVisible, setVisible] = useState(true);

  return (
    <div className="w-full h-full bg-yellow-600 flex justify-center items-center">
      <button onClick={
        () => {
          setVisible(!isVisible);
        }
        } className="w-[50px] h-[50px] bg-red-600 text-white">{isVisible ? "X" : "0"}</button>

      {isVisible && (
        <div className="w-[400px] h-[400px] bg-white flex justify-center items-center flex-col">
          <h1 className="text-[55px]">{count}</h1>

          <div className="w-full h-[50px] flex justify-center items-center gap-2">
            <button onClick={
                () => 
                    setCount(count - 1)
            } className="w-[100px] h-[40px] bg-red-600 text-white">
              Decrement
            </button>

            <button onClick={
                () => 
                    setCount(count + 1)
            } className="w-[100px] h-[40px] bg-green-600 text-white">
              Increment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
