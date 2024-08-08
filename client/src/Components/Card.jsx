import React from "react";
import "./Card.css";
const Card = ({image,title}) => {
  return (
    <div className="Card">
      <img src={image} />

      <div>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default Card;
