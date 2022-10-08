import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createInquiry, createOTP, verifyOTP } from '../apiCalls';
import { AuthContext } from '../context/AuthContext';
import FormInput from './FormInput';

const InquiryForm = () => {
  const { id } = useParams();
  console.log(id);
  const [displayGetOtp, setDisplayGetOtp] = useState(true);
  const [showOtpField, setShowOtpField] = useState(false);
  const [validOtp, setValidOtp] = useState(false);
  const [data, setData] = useState({
    phone: '',
    otp: '',
    inquiry: 'I would like to inquire about this package ...',
  });
  const { user } = useContext(AuthContext);
  const inputs = [
    {
      id: 'phoneInput',
      name: 'phone',
      type: 'text',
      placeholder: 'Enter your phone number',
      errorMessage: 'Please enter a valid 10 digit Phone Number',
      label: 'Phone Number',
      required: true,
      pattern: '[1-9]{1}[0-9]{9}',
    },
    {
      id: 'otpInput',
      name: 'otp',
      type: 'text',
      placeholder: 'Enter OTP',
      errorMessage: 'Incorrect OTP',
      label: 'OTP',
      required: true,
    },
  ];

  const InputEventHandler = (e) => {
    const { name, value } = e.target;
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const generateOTP = async (e) => {
    e.preventDefault();
    if (data.phone) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      let data2send = {
        phone: data.phone,
      };
      const res = await createOTP(data2send, config);

      if (res.status === 200) {
        setDisplayGetOtp(false);
        setShowOtpField(true);
      } else {
        setDisplayGetOtp(true);
        setShowOtpField(false);
      }
    }
  };

  const checkOTP = async (e) => {
    console.log('clicl');
    e.preventDefault();
    if (data.otp) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      let data2send = {
        phone: data.phone,
        otp: data.otp,
      };
      const res = await verifyOTP(data2send, config);

      if (res.status === 200) {
        setValidOtp(true);
        setShowOtpField(false);
      } else {
        setValidOtp(false);
        setShowOtpField(true);
        setData((preVal) => {
          return {
            ...preVal,
            otp: '',
          };
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    let data2send = {
      phone: data.phone,
      text: data.inquiry,
    };
    const res = await createInquiry(data2send, id, config);

    if (res.status === 200) {
      setData({
        phone: '',
        otp: '',
        inquiry: 'Inquiry Submitted!',
      });
      setDisplayGetOtp(false);
    } else {
      setDisplayGetOtp(true);
    }
  };

  return (
    <>
      <div className="col-md-10 mx-auto">
        <div className="row">
          <div className="h4 text-center">Inquiry Form</div>
        </div>
        <div className="row">
          <form className="my-4" onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={data[input.name]}
                onChange={InputEventHandler}
                showotpfield={showOtpField}
              />
            ))}
            <div className="mb-3">
              <button
                className={displayGetOtp ? 'btn btn-outline-primary' : 'd-none'}
                onClick={generateOTP}
              >
                Get otp
              </button>
              <button
                className={showOtpField ? 'btn btn-outline-primary' : 'd-none'}
                onClick={checkOTP}
              >
                Verify otp
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="inquiryText" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="inquiryText"
                rows="3"
                name="inquiry"
                value={data.inquiry}
                onChange={InputEventHandler}
                disabled={!validOtp}
              ></textarea>
            </div>
            <div className="col-md-12">
              <button
                className="btn btn-block btn-outline-primary"
                style={{ width: '100%' }}
                type="submit"
                disabled={!validOtp}
              >
                Submit form
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default InquiryForm;
