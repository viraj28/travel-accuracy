import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { React, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InquiryForm from '../../components/InquiryForm';
import PackageImages from '../../components/PackageImages';
import { AuthContext } from '../../context/AuthContext';
import displayRazorpay from '../../utils/paymentGateway';

const PackageDetails = () => {
  const { id } = useParams();

  const { user } = useContext(AuthContext);
  console.log(user);
  const [packag, setPackage] = useState([]);
  useEffect(() => {
    async function fetchPackages() {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      try {
        const res = await axios.get('/packages', config);

        const data = res.data;
        const filterData = data.filter((o) => o._id === id);
        setPackage(filterData[0]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPackages();
  }, [id, user]);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  });

  return (
    <>
      <section className="section my-5">
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <h4>Package Details</h4>
            </div>
          </div>
          {/* Images */}
          <PackageImages imgArray={packag.packageImages} />
          {/* Package Details */}
          <div className="row">
            <div className="col-md-7">
              <div className="row mb-3">
                <h3>{packag.title}</h3>
              </div>
              <div className="row">
                <p className="h5 text-justify lh-base">{packag.description}</p>
              </div>
              <div className="row my-5">
                <div className="col-md-4">
                  <p className="h5 text-justify font-weight-bold">
                    <FontAwesomeIcon icon={faClock} /> Duration :
                  </p>
                </div>
                <div className=" h6 col-md-8">{packag.duration}</div>
              </div>
              <div className="row my-5">
                <div className="col-md-4">
                  <p className="h5 text-justify font-weight-bold">
                    <FontAwesomeIcon icon={faIndianRupeeSign} /> {packag.price}
                  </p>
                </div>
                <div className=" h6 col-md-8">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      displayRazorpay(config, packag._id, {
                        name: user.name,
                        email: user.email,
                        contact: user.phone,
                      })
                    }
                  >
                    Buy Now!
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PackageDetails;
