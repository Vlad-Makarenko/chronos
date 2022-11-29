import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'flowbite-react';
import {
  MdEventNote,
  MdEdit,
  MdInfo,
  MdDelete,
  MdLock,
  MdLockOpen,
  MdPeople,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { deleteCalendar } from '../../store/calendarSlice';
import { editCalendarOn } from '../../store/modalSlice';

export const CalendarCard = ({ calendar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className='flex flex-col border cursor-pointer w-5/12 lg:w-1/5 mx-3 my-5 border-green-400 rounded-lg p-1 pb-3 hover:shadow-md hover:shadow-green-400 animate-appear'>
      <div className='flex self-end'>
        <Tooltip content={calendar.description}>
          <MdInfo color='green' className='mx-1' />
        </Tooltip>
        {calendar.type !== 'main' && (
          <Tooltip content='Edit calendar'>
            <MdEdit
              onClick={() => dispatch(editCalendarOn())}
              color='green'
              className='mx-1'
            />
          </Tooltip>
        )}
        {calendar.type !== 'main' && (
          <Tooltip content='Delete calendar'>
            <MdDelete
              onClick={() => dispatch(deleteCalendar({ id: calendar._id }))}
              color='green'
              className='mx-1'
            />
          </Tooltip>
        )}
      </div>
      <div onClick={() => navigate('/')} className='flex flex-col'>
        <span className='flex items-center font-bold mb-2 mt-1 w-full justify-center text-xl'>
          {calendar.name}
        </span>
        <span className='flex items-center w-full lg:px-5 justify-start text-lg'>
          <MdEventNote color='green' className='mx-3' />
          {calendar.events.length} Events
        </span>
        <span className='flex items-center w-full lg:px-5 justify-start text-lg'>
          {calendar.isPublic ? (
            <MdLockOpen color='green' className='mx-3' />
          ) : (
            <MdLock color='green' className='mx-3' />
          )}

          {calendar.isPublic ? 'Public' : 'Private'}
        </span>
        <span className='flex items-center w-full lg:px-5 justify-start text-lg'>
          <MdPeople color='green' className='mx-3' />
          {calendar.participants.length} members
        </span>
      </div>
    </div>
  );
};
