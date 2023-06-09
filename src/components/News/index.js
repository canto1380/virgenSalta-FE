import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import HeaderSections from "../Title/HeaderSections";
import GenericCarousel from "../Carousel/GenericCarousel";
import { getNews } from "../../utils/queryAPI/news";

const News = () => {
  const [news, setNews] = useState();

  useEffect(()=> {
    dataNews()
  },[])
  const dataNews = async() => {
    const params = {limit: 6, deleted: false}
    const data = await getNews(params)
    setNews(data)
  }
  return (
    <>
      <HeaderSections title={"Noticias"} linkRef={"/noticias"}/>
      <Row className="mt-3 mb-5">
      <GenericCarousel data={news?.allNews} />
      </Row>
    </>
  );
};

export default News;
