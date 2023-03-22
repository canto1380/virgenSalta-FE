import React from 'react';
import { Card } from 'react-bootstrap';
import ImgPrueba from '../../images/logo.jpg'

const CardGeneric = ({info: {titulo, img}, i}) => {
  return (
    <div>
      <Card className="cardG-container">
        <img src={ImgPrueba} alt="imagen" className="cardG-img" />
          <p className="mb-0 cardG-title">
            {titulo.toUpperCase()} {i + 1}
          </p>
      </Card>
    </div>
  );
};

export default CardGeneric;
