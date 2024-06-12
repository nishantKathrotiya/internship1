import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../slices/profile';
import Cookies from 'js-cookie';

const useAuthCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      // If no token, clear user state and navigate to login
      dispatch(setToken(null));
      dispatch(setUser(null));
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      Cookies.remove('token');
    } else {
      // If token exists, set token and user in redux state (optional)
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch(setToken(token));
      dispatch(setUser(user));
    }
  }, [dispatch, navigate]);
};

export default useAuthCheck;
