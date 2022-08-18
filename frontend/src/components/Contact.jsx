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
      <section class="section" id="contact">
        <div className="my-5">
          <h1 className="text-center">Contact Us</h1>
        </div>
        <div className="container contact_div">
          <div className="row">
            <div className="col-md-6 col-10 mx-auto">
              <form onSubmit={formSubmit}>
                <div class="mb-3">
                  <label for="fullNameInput" class="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="fullNameInput"
                    name="fullName"
                    value={data.fullName}
                    onChange={InputEventHandler}
                    placeholder="Enter your name"
                  />
                </div>

                <div class="mb-3">
                  <label for="phoneInput" class="form-label">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="phoneInput"
                    name="phone"
                    value={data.phone}
                    onChange={InputEventHandler}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div class="mb-3">
                  <label for="emailInput" class="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="emailInput"
                    name="email"
                    value={data.email}
                    onChange={InputEventHandler}
                    placeholder="name@example.com"
                  />
                </div>
                <div class="mb-3">
                  <label for="messageInput" class="form-label">
                    Message
                  </label>
                  <textarea
                    class="form-control"
                    id="messageInput"
                    rows="3"
                    name="msg"
                    value={data.msg}
                    onChange={InputEventHandler}
                  ></textarea>
                </div>
                <div class="col-12">
                  <button class="btn btn-outline-primary" type="submit">
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
