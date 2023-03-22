import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { secciones } from "../../utils/seeders";
import CardGeneric from "../Cards/CardGeneric";
import HeaderSections from "../Title/HeaderSections";

const Sections = () => {
  const [category, setCategory] = useState();
  useEffect(() => {
    const filterCat = secciones.slice(0, 6);
    setCategory(filterCat);
  }, []);
  return (
    <>
      <HeaderSections title={"Categorias"} linkRef={"/aa"} />
      <Row className="mt-3 mb-5">
        {category?.map((secc, i) => (
          <Col key={i} xs={12} md={6} lg={4} className="mb-4">
            <CardGeneric info={secc} i={i} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Sections;
