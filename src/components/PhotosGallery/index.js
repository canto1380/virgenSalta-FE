import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import HeaderSections from "../Title/HeaderSections";
import { photos } from "../../utils/seeders";
import CardGeneric from "../Cards/CardGeneric";

const PhotosGallery = () => {
  const [photosBack, setPhotosBack] = useState()
  useEffect(() => {
    let filterPhotos = photos()
    filterPhotos = filterPhotos.slice(0,8)
    setPhotosBack(filterPhotos)
  },[])
  return (
    <div>
        <HeaderSections title={"Fotos"}
          linkRef={"/fotos"}/>
      <Row className='mt-3 mb-5'>
        {photosBack?.map((p) => (
          <Col key={p.id} xs={12} md={4} lg={3} className='mb-4'>
            <CardGeneric info={p} styleAdd={'img-radius'}/>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PhotosGallery;
