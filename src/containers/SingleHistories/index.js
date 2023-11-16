import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import LayoutFoot from "../../components/Layout/LayoutFoot";
import BodyNews from "../../components/News/SingleNews/BodyNews";
import HeaderNews from "../../components/News/SingleNews/HeaderNews";
import { getHistory } from "../../utils/queryAPI/history";

const SingleHistory = () => {
  const { title } = useParams();

  let navigate = useNavigate();

  const [singleHistory, setSingleHistory] = useState();
  useEffect(() => {
    dataHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dataHistory = async () => {
    const params = { limit: 1000, deleted: false };
    const data = await getHistory(params);
    
    const history = data.allHistory.filter(
      (d) => d.title.replace(/ /g, "-") === title
      );

    if (history.length === 0) {
      navigate("/home");
    } else {
      setSingleHistory(history[0]);
    }
  };
  return (
    <>
      <Layout />
      <Container>
        <Row className="mx-3 pt-2 pb-5">
          <Col xs={12} className="pt-5">
            <HeaderNews data={singleHistory} sectionType='history'/>
          </Col>
          <hr className='pb-3'/>
          <Col xs={12} className="pb-5">
            <BodyNews data={singleHistory?.description} photos={singleHistory?.photos}/>
          </Col>
          <hr />
        </Row>
      </Container>
      <LayoutFoot />
    </>
  );
};

export default SingleHistory;
