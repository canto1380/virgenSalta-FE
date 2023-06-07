import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { MdDateRange, MdAccessTime } from "react-icons/md";
import "../News/news.css";
const MoreNewsCard = ({ data, typeFlag }) => {
  const [titleParams, setTitleParams] = useState(typeFlag === 'news' ? data.title : data?.nameCategory);

  const date = new Date(data?.createdAt);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  const minuts = date.getMinutes();
  console.log(typeFlag)

  useEffect(() => {
    setTitleParams(typeFlag === 'news' ? data?.title.replace(/ /g, "-") : data?.nameCategory.replace(/ /g, "-"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card className="cardNewsPage">
      <Card.Img
        variant="top"
        src={`${typeFlag === 'news' ? data?.photos[0] : data?.backdrop}`}
        className="cardNewsPage-img"
      />
      <Card.Body className="cardNewPage-body">
        <Card.Title className="cardNewsPage-title pb-3">
          {data?.title} {data?.nameCategory}
        </Card.Title>
        {typeFlag === "news" && (
          <>
            <div className="d-flex justify-content-between cardNewsPage-subtitle pb-2">
              <div className="cardNewsPage-subtitle1">
                <MdDateRange className="cardNewsPage-icon me-2" />
                {`${day}/${month}/${year}`}{" "}
              </div>
              <div className="cardNewsPage-subtitle1">
                <MdAccessTime className="cardNewsPage-icon me-2" />
                {`${hour}:${minuts}hs`}
              </div>
            </div>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </>
        )}
        <a href={typeFlag === 'news' ? `/noticias/${titleParams}` : `/categorias/${titleParams}`}>
          <Button variant="primary" className="section-btn">
            Leer Más
          </Button>
        </a>
      </Card.Body>
    </Card>
  );
};

export default MoreNewsCard;
