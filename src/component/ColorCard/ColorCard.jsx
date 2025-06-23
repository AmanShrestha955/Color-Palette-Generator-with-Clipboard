import react from "react";
import "./ColorCard.css";

const ColorCard = ({ color, widthSize, onCopy }) => {
  return (
    <div className="color-card" style={{ background: color, width: widthSize }}>
      <div className="copy-color" onClick={onCopy}>
        <span>copy</span>
      </div>
    </div>
  );
};
export default ColorCard;
