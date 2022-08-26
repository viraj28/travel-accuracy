import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import FormInput from '../components/FormInput';
import login from '../images/login.svg';
import { loginCall } from '../apiCalls';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const inputs = [
    {
      id: 'emailInput',
      type: 'email',
      name: 'email',
      placeholder: 'name@example.com',
      label: 'Email Address',
      errorMessage: 'Invalid Email',
      pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,63}$',
      required: true,
    },
    {
      id: 'passInput',
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
      label: 'Password',
      errorMessage: 'Invalid Format',
      pattern:
        '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
      required: true,
    },
  ];
  const { dispatch } = useContext(AuthContext);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const InputEventHandler = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'LOGIN_START' });
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    loginCall({ email, password }, dispatch);
    await delay(2000);
    if (localStorage.getItem('user')) {
      //TODO: Navigate to dashboard Page
      return navigate('/', { replace: true });
    }
  };

  return (
    <>
      <section className="section my-3">
        <div className="container">
          <div className="d-sm-flex mt-5 ">
            <div className="w-50 ">
              <img
                src={login}
                alt="login"
                className="img-fluid animated d-none d-sm-block"
              />
            </div>
            <div className="mx-auto formContents">
              <h3 className="text-center">Log in</h3>
              <form onSubmit={formSubmit} className="my-5">
                {inputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    onChange={InputEventHandler}
                    value={data[input.name]}
                  />
                ))}

                {/* <!-- Submit button --> */}

                <button
                  className="btn btn-outline-primary btn-block mb-4 "
                  type="submit"
                >
                  Log In
                </button>

                <div className="text-center">
                  <p>
                    New User?
                    <NavLink className="" to="/register">
                      {' '}
                      Register.
                    </NavLink>
                  </p>
                </div>

                {/* <!-- Social login --> */}
                <div className="text-center">
                  <p>Or log in with:</p>
                  <a href=" #" className="btn btn-outline-primary btn-block">
                    <i className="fab fa-google-f"></i> Google
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
