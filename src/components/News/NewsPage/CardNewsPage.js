import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import ImgPrueba from "../../../images/logo.jpg";
import { MdDateRange, MdAccessTime } from "react-icons/md";
import "../news.css";
const CardNewsPage = ({ info: { img, titulo, id } }) => {
  const [titleParams, setTitleParams] = useState(titulo);

  useEffect(() => {
    setTitleParams(titulo.replace(/ /g, "-"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card className="cardNewsPage">
      <Card.Img variant="top" src={ImgPrueba} className="cardNewsPage-img" />
      <Card.Body className="cardNewPage-body">
        <Card.Title className="cardNewsPage-title">{titulo}</Card.Title>
        <div className="d-flex justify-content-between cardNewsPage-subtitle">
          <div className="cardNewsPage-subtitle1">
            <MdDateRange className="cardNewsPage-icon me-2" />
            16/03/23{" "}
          </div>
          <div className="cardNewsPage-subtitle1">
            <MdAccessTime className="cardNewsPage-icon me-2" />
            16:15
          </div>
        </div>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <a href={`/noticias/${titleParams}`}>
          <Button variant="primary" className="section-btn">
            Leer Más
          </Button>
        </a>
      </Card.Body>
    </Card>
  );
};

export default CardNewsPage;
