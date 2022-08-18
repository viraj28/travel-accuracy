import React from 'react';
import web2 from '../images/Travel_plans.svg';
import Common from './Common';

function About() {
  return (
    <>
      <Common
        name="About"
        imgsrc={web2}
        visit="/contact"
        btname="Contact now"
      />
    </>
  );
}

export default About;
