import React from 'react';
import { Container } from 'react-bootstrap';
import Cover from './Cover';
import News from './News';
import Title from './Title';

const Home = () => {
  return (
    <div>
      <Title />
      <Container fluid className='px-0 container-cover'>
        <Cover />
      </Container>
      <Container className='py-5'>
        <News />
      </Container>
    </div>
  );
};

export default Home;
