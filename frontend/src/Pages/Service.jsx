import React from 'react';
import Sdata from '../components/Sdata';
import Card from '../components/Card';

const Service = () => {
  return (
    <>
      <section className="section" id="service">
        <div className="my-5">
          <h1 className="text-center ">Our Services</h1>
        </div>
        <div className="container-fluid mb-5">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="row gy-5">
                {Sdata.map((val, ind) => {
                  return (
                    <Card
                      key={ind}
                      imgsrc={val.imgsrc}
                      title={val.title}
                      desc={val.desc}
                      isPackage={false}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;
