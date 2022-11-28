import React from 'react';
import { useSelector } from 'react-redux';
import { MdEventNote } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export const CalendarCard = ({ calendar }) => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col border cursor-pointer w-5/12 lg:w-1/5 mx-3 my-5 border-green-400 rounded-lg p-5 hover:shadow-md hover:shadow-green-400 duration-150'>
      <span className='flex items-center w-full justify-center text-xl'>
        {calendar.name}
      </span>
      <span className='flex items-center w-full justify-center text-lg'>
        <MdEventNote color='green' />
        {calendar.events.length} Events
      </span>
      <span className='flex items-center w-full justify-center text-lg'>
        <MdEventNote color='green' />
        {calendar.events.length} Events
      </span>
      <span className='flex items-center w-full justify-center text-lg'>
        <MdEventNote color='green' />
        {calendar.events.length} Events
      </span>
    </div>
  );
};
