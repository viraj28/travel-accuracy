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
