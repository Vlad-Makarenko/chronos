import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'flowbite-react';
import { checkAuth, tokenAuth, buffOff } from '../store/authSlice';

export const CheckLogin = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(tokenAuth());
      dispatch(checkAuth());
    }
    dispatch(buffOff());
  }, []);

  if (!isLoading) {
    return <Outlet />;
  }
  return (
    <Spinner color='success' size='xl' aria-label='Success spinner example' />
  );
};
