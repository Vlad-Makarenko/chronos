import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { useMessage } from '../../hooks/message.hook';
import { editEventOn } from '../../store/modalSlice';
import { updateEvent } from '../../store/eventSlice';
import { eventTypes } from '../../utils/event.utils';

export const InfoEventForm = () => {
  const dispatch = useDispatch();
  const message = useMessage();

  const { isLoading, event } = useSelector((state) => state.event);

  return (
    <div>
      <h1> Vlad Bebra</h1>
    </div>
  );
};
