import React from 'react';
import web2 from '../images/Travel_plans.svg';
import Common from '../components/Common';
import { Link } from 'react-router-dom';

function About() {
  const detail = (
    <p>
      We are a platform where Travel Agents can connect with Suppliers (DMCs)
      and get a perfect planned trip for their customers at a reasonable price.{' '}
      <Link to="/more-about" target="_blank">
        Read More.
      </Link>
    </p>
  );

  return (
    <>
      <Common
        name="About"
        imgsrc={web2}
        visit="/contact"
        btname="Contact now"
        detail={detail}
      />
    </>
  );
}

export default About;
