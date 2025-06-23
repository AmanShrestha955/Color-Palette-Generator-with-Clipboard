import { useState, useEffect } from "react";
import "./App.css";
import ColorCard from "./component/ColorCard/ColorCard";

function App() {
  const cardContainerWidth = 1000;
  const [cardNum, setCardNum] = useState(5);
  const [cardColors, setCardColors] = useState([]);
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const copyToClipboard = (color) => {
    navigator.clipboard
      .writeText(color)
      .then(() => {
        alert(`Color ${color} copied to clipboard!`);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const copyAll = () => {
    let copy = "";
    cardColors.forEach((color) => {
      copy += color + "\n";
    });
    copyToClipboard(copy);
  };

  const generateColors = (colorCount) => {
    const colors = [];
    for (let i = 0; i < colorCount; i++) {
      colors.push(generateRandomColor());
    }
    setCardColors(colors);
  };
  useEffect(() => {
    generateColors(cardNum);
  }, [, cardNum]);

  return (
    <>
      <main className="card-holder">
        {cardColors.map((color, index) => (
          <ColorCard
            key={index}
            color={color}
            widthSize={cardContainerWidth / cardNum}
            onCopy={() => copyToClipboard(color)}
          />
        ))}
      </main>
      <div className="btn">
        <button
          onClick={() =>
            cardNum < 10 ? setCardNum(cardNum + 1) : setCardNum(3)
          }
        >
          Add Color
        </button>
        <button onClick={() => generateColors(cardNum)}>generate</button>
        <button onClick={() => copyAll()}>copy all</button>
      </div>
    </>
  );
}

export default App;
