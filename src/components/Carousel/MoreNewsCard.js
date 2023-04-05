import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { MdDateRange, MdAccessTime } from "react-icons/md";
import '../News/news.css'
const MoreNewsCard = ({data}) => {
  const [titleParams, setTitleParams] = useState(data?.titulo);

  useEffect(() => {
    setTitleParams(data?.titulo.replace(/ /g, "-"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card className="cardNewsPage">
      <Card.Img variant="top" src={data?.img} className="cardNewsPage-img" />
      <Card.Body className="cardNewPage-body">
        <Card.Title className="cardNewsPage-title">{data?.titulo}</Card.Title>
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

export default MoreNewsCard;
