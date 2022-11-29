import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Tooltip } from 'flowbite-react';
import { MdInfo } from 'react-icons/md';
import { HiClock } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export const TodayEventCard = ({ event }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className='flex border-t cursor-pointer w-11/12  mx-3 my-3 border-t-green-400  p-2 px-4 hover:bg-gradient-to-br from-green-100 animate-appear'>
      <div className='flex h-full items-center w-2/3 font-bold mb-2 py-1 text-xl'>{event.name}</div>
      <div className='w-1/3 flex h-full items-center justify-end'>
        <Tooltip
          content={<span>This event from <b>{event.parentCalendar.name}</b> calendar</span>}>
          <MdInfo color='green' className='mx-1' />
        </Tooltip>
        <Tooltip
          content={`Event starts at: ${moment(event.startEvent).format(
            'HH:mm'
          )}`}>
          <HiClock color='green' className='mx-1' />
        </Tooltip>
      </div>
    </div>
  );
};
