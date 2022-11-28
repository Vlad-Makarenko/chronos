import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PswdInput } from '../components/auth/PwsdInput';
import { PswdResetConf } from '../components/auth/PswdResetConf';
import { resetPassword } from '../store/authSlice';

export const ResetPassword = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate('/auth');
    }
  }, [success]);

  return (
    <div className='container flex flex-column items-center justify-center'>
      <PswdResetConf />
    </div>
  );
};
