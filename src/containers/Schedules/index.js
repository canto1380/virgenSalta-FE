import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import LayoutFoot from "../../components/Layout/LayoutFoot";
import DailyEvents from "../../components/Schedules/DailyEvents";
import ImportantDates from "../../components/Schedules/ImportantDates";

const Schedules = () => {
  return (
    <>
    <Layout/>
      <Container fluid className="bg-gradient-2">
        <div className="container">
          <Row className="mx-3 pt-2 pb-5">
            <Col xs={12} className="pt-5 pb-3">
              <p className="page-section-title text-light">
                Horarios de Celebraciones
              </p>
              <hr />
            </Col>
            <Col xs={12} className="bg-light px-0">
              <ImportantDates />
            </Col>
            <Col xs={12} className="my-5 bg-light px-0">
              <DailyEvents />
            </Col>
          </Row>
        </div>
      </Container>
      <LayoutFoot />
    </>
  );
};

export default Schedules;
