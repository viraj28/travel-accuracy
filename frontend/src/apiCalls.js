import axios from 'axios';

import { toast } from 'react-toastify';

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const res = await axios.post('/users/login', userCredential);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    localStorage.setItem('user', JSON.stringify(res.data));

    toast.success('Login Success! Redirecting...');
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error });

    toast.error(error.response.data.message);
  }
};

export const addPackage = async (data, config) => {
  try {
    const res = await axios.post('/packages', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: config.headers.Authorization,
      },
    });
    console.log('response', res);
    console.log('Data', data);
    toast.success('Package Added!');
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
