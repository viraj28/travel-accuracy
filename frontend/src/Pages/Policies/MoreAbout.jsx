import React from 'react';
import pp from '../../pdfs/About Us.pdf';

const MoreAbout = () => {
  return (
    <>
      <section className="section my-3">
        <div className="container">
          <h2>About</h2>
          <hr />
          <iframe title="privacy" src={pp} width="100%" height="600" />
        </div>
      </section>
    </>
  );
};

export default MoreAbout;
