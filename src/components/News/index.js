import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import NewCarousel from "./NewCarousel";

const News = () => {
  return (
    <>
      <Row className="">
        <Col xs={7} className="text-start">
          <h4 className='section-title'>Noticias</h4>
        </Col>
        <Col xs={5} className="text-end">
          <Button className='section-btn'>Ver todo</Button>
        </Col>
      </Row>
      <Row className='mt-3 mb-5'>
        <NewCarousel />
      </Row>
    </>
  );
};

export default News;
