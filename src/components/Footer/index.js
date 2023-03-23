import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./footer.css";
import Logo from "../../images/logo-corazon.jpg";
import DirectAccess from "./DirectAccess";
import ContactFooter from "./ContactFooter";
const Footer = () => {
  return (
    <Container fluid className="container-footer">
      <Row>
        <Col xs={12} sm={4} className="d-flex align-items-center justify-content-center container-img-foot">
          <img src={Logo} alt="Virgen Maria" className="img-foot" />
        </Col>
        <Col xs={6} sm={4} className="py-5">
          <DirectAccess />
        </Col>
        <Col xs={6} sm={4} className=" py-5">
          <ContactFooter />
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
