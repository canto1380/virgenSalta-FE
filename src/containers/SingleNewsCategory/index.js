import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNewsCategory } from "../../utils/queryAPI/newsCategory";
import Layout from "../../components/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import LayoutFoot from "../../components/Layout/LayoutFoot";
import MoreNewsCarousel from "../../components/Carousel/MoreNewsCarousel";

const SingleNewsCategory = () => {
  const { nameCategory } = useParams();
  const navigate = useNavigate();

  const [allNewsCategory, setAllNewsCategory] = useState([]);
  const [singleNewsCategory, setSingleNewsCategory] = useState();
  const BORRAR_AL_DESARROLLAR = nameCategory.replace(/-/g, " ");
  useEffect(() => {
    dataNewsCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(nameCategory.replace(/-/g, " "));

  const dataNewsCategory = async () => {
    const params = { limit: 1000, deleted: false };
    const data = await getNewsCategory(params);
    setAllNewsCategory(data.allNewsCategory);
    const newsCategory = data.allNewsCategory.filter(
      (d) => d.nameCategory.replace(/ /g, "-") === nameCategory
    );
    if (newsCategory.length === 0) {
      navigate("/home");
    } else {
      setSingleNewsCategory(newsCategory);
    }
  };

  return (
    <>
      <Layout />
      <Container>
        <Row className="mx-3 pt-2 pb-5">
          <div className="text-center">
            <h2>{BORRAR_AL_DESARROLLAR}</h2>
            <h4>Seccion en desarrollo</h4>
          </div>
        </Row>
        {singleNewsCategory === "aa" && (
          <Row className="mx-3 pt-2 pb-5">
            <Col xs={12} className="pt-5 pb-3"></Col>
            <hr />
          </Row>
        )}
      </Container>
      <Container fluid>
        <Row className="bg-gradient-1 px-3 pt-4 pb-5">
          <MoreNewsCarousel
            data={allNewsCategory}
            typeFlag="newsCategory"
            title="Secciones recientes"
          />
        </Row>
      </Container>
      <LayoutFoot />
    </>
  );
};

export default SingleNewsCategory;
