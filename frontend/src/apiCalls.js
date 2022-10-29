import axios from 'axios';

import { toast } from 'react-toastify';

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const res = await axios.post('/api/users/login', userCredential);
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
    const res = await axios.post('/api/packages', data, {
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

export const deletePackage = async (id, config) => {
  try {
    const res = await axios.delete(`/api/packages/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: config.headers.Authorization,
      },
    });
    console.log('response', res);
    toast.success('Package Deleted!');
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const deleteInquiry = async (id, config) => {
  try {
    toast.success('Inquiry Deleted!');
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const deleteUser = async (id, config) => {
  try {
    toast.success('User Deleted!');
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const createOTP = async (data, config) => {
  try {
    const res = await axios.post('/api/otp/generate', data, {
      headers: {
        Authorization: config.headers.Authorization,
      },
    });
    console.log(res);
    if (res.status === 200) {
      toast.success('OTP sent');
    }
    return res;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const verifyOTP = async (data, config) => {
  try {
    const res = await axios.post('/api/otp/verify', data, {
      headers: {
        Authorization: config.headers.Authorization,
      },
    });
    console.log(res);
    if (res.status === 200) {
      toast.success(res.data.message);
    }
    return res;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const createInquiry = async (data, id, config) => {
  try {
    const res = await axios.post(`/api/inquire/${id}`, data, {
      headers: {
        Authorization: config.headers.Authorization,
      },
    });
    console.log(res);
    if (res.status === 200) {
      toast.success(res.data.message);
    }
    return res;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};
