import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import MoreNewsCarousel from "../../components/Carousel/MoreNewsCarousel";
import BodyNews from "../../components/News/SingleNews/BodyNews";
import HeaderNews from "../../components/News/SingleNews/HeaderNews";

const SingleNews = ({ data }) => {
  const { title } = useParams();
  let navigate = useNavigate();
  const [singleNews, setSingleNews] = useState();
  const [moreNews, setMoreNews] = useState([]);
  useEffect(() => {
    setMoreNews(data.slice(0, 4));
    const news = data.filter((d) => d.titulo.replace(/ /g, "-") === title);
    if (news.length === 0) {
      navigate("/home");
    } else {
      setSingleNews(news[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, title]);
  return (
    <>
    <Container>
      <Row className="mx-3 pt-2 pb-5">
        <Col xs={12} className="pt-5 pb-3">
          <HeaderNews data={singleNews} />
        </Col>
        <Col xs={12} className="pb-5">
          <BodyNews data={singleNews?.descripcion} />
        </Col>
        <hr />
      </Row>
    </Container>
    <Container fluid>
      <Row className='more-news-container px-3 pt-4 pb-5'>
        <MoreNewsCarousel data={moreNews} />
      </Row>
    </Container>
    </>
  );
};

export default SingleNews;
