import React from 'react';
import web from '../images/Travel plans_Flatline.svg';
import Common from '../components/Common';
import Service from './Service';
import Contact from './Contact';

function Home() {
  return (
    <>
      <Common
        name="Grow your business with"
        imgsrc={web}
        visit="/service"
        btname="Explore now"
      />

      <Service />
      <Contact />
    </>
  );
}

export default Home;
