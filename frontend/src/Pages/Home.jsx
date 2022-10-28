import React from 'react';
import web from '../images/Travel plans_Flatline.svg';
import Common from '../components/Common';
import Service from './Service';
import Contact from './Contact';

function Home() {
  const detail = 'Filling the gap between Travel agents and suppliers.';
  return (
    <>
      <Common
        name="One stop for Travel Agents"
        imgsrc={web}
        visit="/service"
        btname="Explore now"
        detail={detail}
      />

      <Service />
      <Contact />
    </>
  );
}

export default Home;
