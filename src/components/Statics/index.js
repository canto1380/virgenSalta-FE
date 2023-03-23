import React from "react";
import { Row, Col } from "react-bootstrap";
import './statics.css'

const Statics = () => {
  return (
    <Row className="d-flex justify-content-around text-center">
      <Col className="card-effect" xs={12} sm={6} md={4} lg={2}>
        <p className="static-number my-1">1.500.000</p>
        <p className="static-data">Peregrinos por año que llegan al santuario</p>
      </Col>
      <Col className="card-effect" xs={12} sm={6} md={4} lg={2}>
        <p className="static-number my-1">Más de 75</p>
        <p className="static-data">Mensajes dados por la SSMA Virgen</p>
      </Col>
      <Col className="card-effect" xs={12} sm={6} md={4} lg={2}>
        <p className="static-number my-1">7.900</p>
        <p className="static-data">Colectivos de peregrinos larga distancia</p>
      </Col>
      <Col className="card-effect" xs={12} sm={6} md={4} lg={2}>
        <p className="static-number my-1">56.000</p>
        <p className="static-data">Testimonios de milagros y curaciones</p>
      </Col>
      <Col className="card-effect" xs={12} sm={6} md={4} lg={2}>
        <p className="static-number my-1">750</p>
        <p className="static-data">Servidores de Argentina y el mundo</p>
      </Col>
    </Row>
  );
};

export default Statics;
