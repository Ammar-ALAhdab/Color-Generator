import { useState, useEffect } from "react";

function SingleColor({ color, index, length }) {
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    const time = setTimeout(() => {
      setAlert(false);
    }, 1500);
    return () => {
      clearTimeout(time);
    };
  }, [alert]);
  const handleClickBox = () => {
    setAlert(true);
    navigator.clipboard.writeText(color.hexString());
  };
  return (
    <div className='colorBox' style={{ backgroundColor: color.hexString() }} onClick={handleClickBox}>
      <div className={`infoBox ${index > length / 2 && "colorLight"}`}>
        <span className='weight'>{color.weight}%</span>
        <span className='hex'>{color.hexString()}</span>
      </div>
      {alert && <span className='copy'>copied to clipboard</span>}
    </div>
  );
}

export default SingleColor;
