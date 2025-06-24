import react from "react";
import "./ColorCard.css";

const ColorCard = ({
  color,
  widthSize,
  onCopy,
  onDelete,
  onEdit,
  isMobile,
}) => {
  return (
    <div
      className="color-card"
      style={
        isMobile
          ? { background: color, height: widthSize }
          : { background: color, width: widthSize }
      }
    >
      <div className="button">
        <div className="button-color copy" onClick={onCopy}>
          <span>copy</span>
        </div>
        <div className="button-color delete" onClick={onDelete}>
          <span>delete</span>
        </div>
        <div className="button-color edit" onClick={onEdit}>
          <span>edit</span>
        </div>
      </div>
    </div>
  );
};
export default ColorCard;
