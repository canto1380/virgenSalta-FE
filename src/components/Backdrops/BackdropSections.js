import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ImageBackdrop from "../../images/logo.jpg";
import "../News/news.css";
const BackdropSections = ({title, img}) => {
  const [imageBackdrop, setImageBackdrop] = useState("");

  useEffect(() => {
    setImageBackdrop(ImageBackdrop);
  }, []);
  return (
    <div>
      {imageBackdrop !== "" ? (
        <Container
          fluid
          style={{ backgroundImage: `url(${img? img : imageBackdrop})` }}
          className="imgFondo"
        >
          <Row className="backdropNew">
            <Col>
              <p className="title m-0 text-center">{title}</p>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container
          fluid
          style={{ backgroundImage: `url("images/imgDefecto.jpg")` }}
          className="imgFondo"
        >
          <Row className="backdropNew">
            <Col>
              <p className="title m-0 text-center">{title}</p>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default BackdropSections;
