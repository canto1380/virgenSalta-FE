import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import LayoutFoot from "../../components/Layout/LayoutFoot";
import DailyEvents from "../../components/Schedules/DailyEvents";
import ImportantDates from "../../components/Schedules/ImportantDates";
import { getEventType } from "../../utils/queryAPI/eventType";
import { getDailyEvent } from "../../utils/queryAPI/dailyEvent";

const Schedules = () => {
  const [eventType, setEventType] = useState([]);
  const [dailyEvent, setDailyEvent] = useState([]);

  useEffect(() => {
    dataEventType();
  }, []);

  const dataEventType = async () => {
    const params = { deleted: false };
    const data = await getEventType(params);
    setEventType(data.allEvent);
  };

  useEffect(() => {
    dataDailyEvent();
  }, []);

  const dataDailyEvent = async () => {
    const params = { deleted: false, limit: 5000 };
    const data = await getDailyEvent(params);
    setDailyEvent(data.allDailyEvent);
  };

  return (
    <>
      <Layout />
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
              <DailyEvents eventType={eventType} dailyEvent={dailyEvent} />
            </Col>
          </Row>
        </div>
      </Container>
      <LayoutFoot />
    </>
  );
};

export default Schedules;
