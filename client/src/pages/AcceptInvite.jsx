import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';
import { acceptCalendarInvite } from '../store/calendarSlice';

export const AcceptInvite = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(acceptCalendarInvite({ key }));
    navigate('/home');
  });
  return (
    <div>

    </div>
  );
};
