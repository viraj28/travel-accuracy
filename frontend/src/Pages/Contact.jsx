import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';

function Contact() {
  const [data, setData] = useState({
    fullName: '',
    phone: '',
    email: '',
    msg: '',
  });

  const InputEventHandler = (e) => {
    const { name, value } = e.target;
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    var templateParams = data;
    if (!data.fullName || !data.phone || !data.email || !data.msg) return;
    try {
      const res = await axios.get('/api/mail');
      console.log(res);
      emailjs.init(res.data.user_id);
      await emailjs
        .send(res.data.service_id, res.data.template_id, templateParams)
        .then(
          function (response) {
            alert('Message Sent!');
            console.log('SUCCESS!', response.status, response.text);
            setData({
              fullName: '',
              phone: '',
              email: '',
              msg: '',
            });
          },
          function (error) {
            alert('Unable to send at the moment...');
            console.log('FAILED...', error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="section" id="contact">
        <div className="my-5">
          <h1 className="text-center">Contact Us</h1>
        </div>
        <div className="container contact_div">
          <div className="row">
            <div className="col-md-6 col-10 mx-auto">
              <form onSubmit={formSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullNameInput" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullNameInput"
                    name="fullName"
                    value={data.fullName}
                    onChange={InputEventHandler}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phoneInput" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phoneInput"
                    name="phone"
                    value={data.phone}
                    onChange={InputEventHandler}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    name="email"
                    value={data.email}
                    onChange={InputEventHandler}
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="messageInput" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="messageInput"
                    rows="3"
                    name="msg"
                    value={data.msg}
                    onChange={InputEventHandler}
                    required
                  ></textarea>
                </div>
                <div className="col-12">
                  <button className="btn btn-outline-primary" type="submit">
                    Submit form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
