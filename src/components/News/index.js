import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import HeaderSections from "../Title/HeaderSections";
import NewCarousel from "../Carousel/GenericCarousel";
import { noticias } from "../../utils/seeders";

const News = () => {
  const [news, setNews] = useState();

  useEffect(() => {
    const filterNews = noticias.slice(0, 6);
    setNews(filterNews);
  }, []);
  return (
    <>
      <HeaderSections title={"Noticias"} linkRef={"/"} />
      <Row className="mt-3 mb-5">
        <NewCarousel data={news} />
      </Row>
    </>
  );
};

export default News;
