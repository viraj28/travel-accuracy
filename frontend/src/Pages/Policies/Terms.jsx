import React from 'react';
import pp from '../../pdfs/TERMS AND CONDITIONS - Travel Accuracy.pdf';

const Terms = () => {
  return (
    <>
      <section className="section my-3">
        <div className="container">
          <h2>Terms and Conditions</h2>
          <hr />
          <iframe title="terms" src={pp} width="100%" height="600" />
        </div>
      </section>
    </>
  );
};

export default Terms;
