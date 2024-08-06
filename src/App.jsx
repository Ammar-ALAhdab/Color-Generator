import { useState, useRef } from "react";
import Values from "values.js";
import SingleColor from "./SingleColor";

function App() {
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("10");
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const colorsBox = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const colorValue = color.includes("#") ? color : `#${color}`;
      const colors = new Values(colorValue).all(Number(weight));
      setList(colors);
      colorsBox.current.style.gridTemplateRows = `repeat(calc((200 / ${weight}) + 1),minmax(96px,1fr))`;
    } catch (error) {
      setError(true);
    }
  };

  const handleOk = () => {
    setError(false);
  };

  const handleOption = (e) => {
    setWeight(e.target.value);
  };
  const length = list.length;
  return (
    <>
      {error && (
        <div className='error'>
          <div className='errBox'>
            <p className='paraErr'>Please type a valid color in hexa form!</p>
            <button className='okBtn' onClick={handleOk}>
              OK
            </button>
          </div>
        </div>
      )}
      <header>
        <div className='container'>
          <h2 className='title'>Color Generator</h2>
          <div className='options'>
            <span>Weight:</span>
            <label htmlFor='five'>
              <input type='radio' name='weight' onChange={handleOption} checked={weight === "5"} id='five' value='5' />5
            </label>
            <label htmlFor='teen'>
              <input
                type='radio'
                name='weight'
                onChange={handleOption}
                checked={weight === "10"}
                id='teen'
                value='10'
              />
              10
            </label>
            <label htmlFor='twinty'>
              <input
                type='radio'
                name='weight'
                onChange={handleOption}
                checked={weight === "20"}
                id='twinty'
                value='20'
              />
              20
            </label>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              className={`inputColor ${error ? "errorInput" : null}`}
              onChange={(e) => setColor(e.target.value)}
              value={color}
              placeholder='Type a hex color...'
            />
            <input type='submit' value='Generate' />
          </form>
        </div>
      </header>
      <div className='content'>
        <div className='container'>
          {list.length ? (
            <div className='colorsList' ref={colorsBox}>
              {list.map((color, index) => {
                return <SingleColor index={index} color={color} length={length} key={index} />;
              })}
            </div>
          ) : (
            <h1 className='start' ref={colorsBox}>
              Let&apos;s Start!...
            </h1>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
