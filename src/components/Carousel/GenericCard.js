import React from "react";
import "../News/news.css";
import ImgPrueba from "../../images/logo.jpg";

const CardModel = ({ data: { img, titulo, id }, i }) => {
  return (
    <div className="card-container">
      {/* <Card className="card-container"> */}
      <a href={`/noticias/${titulo.replace(/ /g, "-")}`} className="aa">
        <img src={ImgPrueba} alt="imagen" className="card-img" />
        <p className="mb-0 card-title1">
          {titulo}
        </p>
        </a>
    </div>
  );
};

export default CardModel;
