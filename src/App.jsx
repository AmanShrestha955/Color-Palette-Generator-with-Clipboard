import { useState, useEffect } from "react";
import "./App.css";
import ColorCard from "./component/ColorCard/ColorCard";

function App() {
  const cardContainerWidth = 1000;
  const [cardNum, setCardNum] = useState(5);
  const [cardColors, setCardColors] = useState([]);
  const [cardSize, setCardSize] = useState(window.innerWidth / cardNum);
  const [color, setColor] = useState();
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleAddColor = () => {
    if (cardNum >= 9) {
      alert("You can only add up to 9 colors.");
      return;
    } else {
      setCardNum(cardNum + 1);
      setCardColors((prevColors) => {
        const newColors = [...prevColors];
        newColors.push(color || generateRandomColor());
        return newColors;
      });
    }
  };

  const handleDeleteColor = (index) => {
    if (cardNum <= 3) {
      alert("You must have at least three color.");
      return;
    } else {
      const count = 0;
      setCardColors(
        cardColors.filter((color, i) => {
          if (i !== index) {
            return true;
          } else {
            return false;
          }
        })
      );
      setCardNum(cardNum - 1);
    }
  };

  const handleEditColor = (index) => {
    if (color !== undefined && color !== "") {
      setCardColors((prevColors) => {
        const newColors = [...prevColors];
        newColors[index] = color;
        return newColors;
      });
    } else {
      alert("Please select a color to edit.");
    }
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
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 600) {
      setCardSize((window.innerHeight * 0.6) / cardNum);
    } else {
      setCardSize(cardContainerWidth / cardNum);
    }
  }, [cardNum]);

  return (
    <>
      <main className="card-holder">
        {cardColors.map((color, index) => (
          <ColorCard
            key={index}
            color={color}
            widthSize={cardSize}
            isMobile={window.innerWidth <= 600}
            onDelete={() => handleDeleteColor(index)}
            onEdit={() => {
              handleEditColor(index);
            }}
            onCopy={() => copyToClipboard(color)}
          />
        ))}
      </main>
      <h1 className="color-title">Color Generator</h1>
      <input
        type="color"
        name="color-picker"
        id="color-picker"
        onChange={(e) => setColor(e.target.value)}
      />
      <div className="btn">
        <button onClick={handleAddColor}>Add Color</button>
        <button onClick={() => generateColors(cardNum)}>generate</button>
        <button onClick={() => copyAll()}>copy all</button>
      </div>
    </>
  );
}

export default App;
