import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from '../components/FormInput';
import register from '../images/register.svg';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    password: '',
    role: 'agent',
    confirmPassword: '',
  });

  const inputs = [
    {
      id: 'nameInput',
      name: 'name',
      type: 'text',
      placeholder: 'Enter your name',
      errorMessage:
        "Name should be 3-30 characters and shouldn't include special characters",
      label: 'Name',
      required: true,
      autoComplete: 'off',
      pattern: '^[A-Z a-z]{3,30}$',
    },
    {
      id: 'companyInput',
      name: 'companyName',
      type: 'text',
      placeholder: 'Enter your company name',
      errorMessage:
        "Company Name should be 3-16 characters and shouldn't include special characters",
      label: 'Company name',
      required: true,
      autoComplete: 'off',
      pattern: '^[A-Z a-z]{3,16}$',
    },
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
      id: 'emailInput',
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      errorMessage: 'Invalid Email',
      label: 'Email',
      pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,63}$',
      required: true,
    },
    {
      id: 'passwordInput',
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
      errorMessage:
        'Passwords should be 8-20 characters and should include 1 letter, 1 number and 1 special character',
      label: 'Password',
      pattern:
        '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
      required: true,
    },
    {
      id: 'confirmPasswordInput',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Re-enter password',
      errorMessage: "Passwords don't match",
      label: 'Confirm Password',
      pattern: data.password,
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

  const formSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...dataToPass } = data;
    const { name, companyName, phone, email, password, role } = dataToPass;

    try {
      const res = await axios.post('/users/', {
        name,
        companyName,
        phone,
        email,
        password,
        role,
      });
      console.log(res);
      toast.success('Registration Success! Please Login');
      return navigate('/login', { replace: true });
    } catch (err) {
      if (err.response.data.message === 'User already exists') {
        toast.error('Account already exiists! Please use different email.');
      }
    }
  };

  return (
    <>
      <section className="section my-3">
        <div className="container">
          <div className="d-sm-flex  mt-5 ">
            <div className="w-50  ">
              <img
                src={register}
                alt="register-img"
                className="img-fluid animated d-none d-sm-block"
              />
            </div>
            <div className="mx-auto">
              <div className="row formContents">
                <h3 className="text-center">Register</h3>
                <form onSubmit={formSubmit} className="my-5">
                  {inputs.map((input) => (
                    <FormInput
                      key={input.id}
                      {...input}
                      value={data[input.name]}
                      onChange={InputEventHandler}
                    />
                  ))}

                  {/* Radio Buttons */}
                  <div className="d-flex mb-4">
                    <div className="form-check me-3">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="role"
                        id="agentradio"
                        value="agent"
                        onChange={(e) => {
                          setData({
                            ...data,
                            role: 'agent',
                          });
                        }}
                        checked={data.role === 'agent'}
                      />
                      <label htmlFor="agentradio" className="form-check-label">
                        Travel Agent
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="role"
                        id="dmcradio"
                        value="dmc"
                        checked={data.role === 'dmc'}
                        onChange={(e) => {
                          setData({
                            ...data,
                            role: 'dmc',
                          });
                        }}
                      />
                      <label htmlFor="dmcradio" className="form-check-label">
                        DMC
                      </label>
                    </div>
                  </div>
                  {/* <!-- Submit button --> */}
                  <button
                    className="btn btn-outline-primary btn-block mb-4 "
                    type="submit"
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
