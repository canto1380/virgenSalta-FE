import React from "react";
import "../News/news.css";

const CardModel = ({ data: { photos, img, title, _id }, photos1 }) => {
  return (
    <div className="card-container">
      {/* <Card className="card-container"> */}
      <a href={`/noticias/${title.replace(/ /g, "-")}`} className="aa">
        <img src={`https://drive.google.com/uc?id=${photos1}`} alt="imagen" className="card-img" />
        <p className="mb-0 card-title1">
          {title}
        </p>
        </a>
    </div>
  );
};

export default CardModel;
