import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import HeaderSections from "../Title/HeaderSections";
import GenericCarousel from "../Carousel/GenericCarousel";
import { jornadas } from "../../utils/seeders";

const SpecialDays = () => {
  const [specialDay, setSpecialDay] = useState();

  useEffect(() => {
    const filterSpecialDay = jornadas.slice(0, 6);
    setSpecialDay(filterSpecialDay);
  }, []);
  return (
    <div>
      <Row className="ps-4">
        <HeaderSections
          title={"Jornadas"}
          linkRef={"/jornadas"}
          styleAdd={"text-white"}
        />
      </Row>
      <Row className="mt-3 mb-5 ps-4 pe-4">
        <GenericCarousel data={specialDay} />
      </Row>
    </div>
  );
};

export default SpecialDays;
