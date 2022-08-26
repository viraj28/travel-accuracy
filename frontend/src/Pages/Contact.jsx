import React, { useState } from 'react';

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

  const formSubmit = (e) => {
    e.preventDefault();
    alert(
      `My name is ${data.fullName}. My phone number is ${data.phone}. My email is ${data.email}. My message is ${data.msg}`
    );
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
