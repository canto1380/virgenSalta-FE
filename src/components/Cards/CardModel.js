import React from "react";
import { Card } from "react-bootstrap";
import "./card.css";

const CardModel = ({ news: { img, titulo }, i }) => {
  return (
    <div>
      <Card className="">
        <img src={img} alt="imagen" className="" />
          <p className="mb-0 card-title">
            {titulo} {i + 1}
          </p>
      </Card>
    </div>
  );
};

export default CardModel;
