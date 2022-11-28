/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ResetPassword } from '../pages/ResetPassword';
import { Main } from '../pages/Main';
import { Home } from '../pages/Home';
import { Calendar } from '../pages/Calendar';
import { Profile } from '../pages/Profile';
import { Hidden } from '../pages/Hidden';
import { Auth } from '../pages/Auth';

export const useRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return (
      <Routes path>
        <Route path='/' element={<Main />} exact />
        <Route path='/home' element={<Home />} exact />
        <Route path='/calendar/:id' element={<Calendar />} exact />
        <Route path='/profile' element={<Profile />} exact />
        <Route path='/hidden' element={<Hidden />} exact />
        <Route path='/password-reset/:token' element={<ResetPassword />} exact />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    );
  }
  return (
    <Routes path>
      <Route path='/' element={<Main />} exact />
      <Route path='/auth' element={<Auth/>} exact />
      <Route path='/password-reset/:token' element={<ResetPassword />} exact />
      <Route path='*' element={<Navigate to='/auth' replace />} />
    </Routes>
  );
};
