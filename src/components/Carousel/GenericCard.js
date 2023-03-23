import React from "react";
import { Card } from "react-bootstrap";
import "../News/news.css";
import ImgPrueba from "../../images/logo.jpg";

const CardModel = ({ data: { img, titulo }, i }) => {
  return (
    <div className="card-container">
      {/* <Card className="card-container"> */}
      <a href={'/aa'} className="aa">
        <img src={ImgPrueba} alt="imagen" className="card-img" />
        <p className="mb-0 card-title">
          {titulo} {i + 1}
        </p>
        </a>
      {/* </Card> */}
    </div>
  );
};

export default CardModel;
