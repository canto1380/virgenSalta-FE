import React from 'react';
import { Card } from 'react-bootstrap';
import ImgPrueba from '../../images/logo.jpg'

const CardGeneric = ({info: {titulo, img, id},  styleAdd}) => {
  return (
    <div>
      <a href={`/noticias/${titulo}`} className="">
      <Card className={`cardG-container border border-0`}>
        <img src={ImgPrueba} alt="imagen" className={`cardG-img ${styleAdd}`} />
        {
          titulo && (
          <p className="mb-0 cardG-title">
            { titulo.toUpperCase()}
          </p>
          )
        }
      </Card>
         </a>
    </div>
  );
};

export default CardGeneric;
