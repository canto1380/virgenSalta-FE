import React from "react";
import { Container } from "react-bootstrap";
import Cover from "./Cover";
import News from "./News";
import Categories from "./Categories";
import Title from "./Title";
import SpecialDays from "./SpecialDays";
import Statics from "./Statics";
import PhotosGallery from "./PhotosGallery";
import VideoGallery from "./VideoGallery";
import FastAccess from "./FastAccess";

const Home = () => {
  return (
    <div>
      <Title />
      <Container fluid className="px-0 container-cover">
        <Cover />
      </Container>
      <Container className="py-5">
        <News />
        <div className='text-center'>
          <p className='phrase1 mb-0'>"Hay que juntar el rebaño antes que oscurezca"</p>
          <p className='phrase1 mb-4'>"No he venido a criticar ni a destruir, sino a Construir"</p>
        </div>
        <div className='text-center'>
          <p className="section-title">
            Sitio Oficial del Santuario de las Apariciones de la Santísima
            Virgen María y de Nuestro Señor Jesucristo
          </p>
          <p className="section-title">SALTA - ARGENTINA</p>
        </div>
        <hr className='my-5'/>
        <Categories/>
        <FastAccess />
      </Container>
      <Container fluid className='container-special-day py-5'>
        <SpecialDays className='px-0'/>
      </Container>
      <Container className='py-5'>
        <Statics />
        <hr className='my-5'/>
        <PhotosGallery />
        <hr className='my-5'/>
        <VideoGallery />
      </Container>
    </div>
  );
};

export default Home;
