import React from 'react';
import pp from '../../pdfs/Refund Policy - Travel Accuracy.pdf';

const Refund = () => {
  return (
    <>
      <section className="section my-3">
        <div className="container">
          <h2>Refund Policy</h2>
          <hr />
          <iframe title="privacy" src={pp} width="100%" height="600" />
        </div>
      </section>
    </>
  );
};

export default Refund;
