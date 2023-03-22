import React from "react";
import { Row, Col } from "react-bootstrap";

const HeaderSections = ({ title, linkRef, styleAdd }) => {
  console.log(styleAdd);
  return (
    <Row className="">
      <Col xs={7} className="text-start">
        <h4 className={`section-title ${styleAdd}`}>{title}</h4>
      </Col>
      <Col xs={5} className="text-end">
        <a href={linkRef} className="btn section-btn">
          Ver todo
        </a>
      </Col>
    </Row>
  );
};

export default HeaderSections;
