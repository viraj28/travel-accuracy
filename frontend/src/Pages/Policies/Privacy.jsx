import React from 'react';
import pp from '../../pdfs/Privacy Policy - Travel Accuracy.pdf';

const Privacy = () => {
  return (
    <>
      <section className="section my-3">
        <div className="container">
          <h2>Privacy Policy</h2>
          <hr />
          <iframe title="privacy" src={pp} width="100%" height="600" />
        </div>
      </section>
    </>
  );
};

export default Privacy;
