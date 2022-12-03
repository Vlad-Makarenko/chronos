import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Checkbox, Label, Button } from 'flowbite-react';
import Select from 'react-select';

import { Loader } from '../Loader';
import { deleteEvent, updateEvent } from '../../store/eventSlice';
import { editEventOn, infoEventOff } from '../../store/modalSlice';

export const InfoEventForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventLoading, event } = useSelector((state) => state.event);
  const { me } = useSelector((state) => state.auth);
  const [isPerformed, setIsPerformed] = useState(!!event.isPerformed);

  useEffect(() => {
    setIsPerformed(!!event.isPerformed);
  }, [event.isPerformed]);

  if (eventLoading) return <Loader />;
  return (
    <div className='overflow-hidden bg-white animate-appear sm:rounded-lg'>
      <dl>
        <div className=' bg-white px-4 pb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
          <dt className='flex items-center text-sm font-medium text-gray-500'>
            Author
          </dt>
          <dd className='flex items-center mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
            <Avatar
              className='pr-3'
              alt='User settings'
              img={event.author ? event.author.avatar : ''}
            />
            <p className='cursor-pointer' onClick={() => {
              navigate(`/user/${event.author._id}`);
              dispatch(infoEventOff());
            }}>
              {event.author ? event.author.login : ''}
            </p>
          </dd>
        </div>
        <div className='bg-green-100 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
          <dt className='text-sm font-medium text-gray-500'>Name</dt>
          <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
            {event.name}
          </dd>
        </div>
        <div className='bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
          <dt className='text-sm font-medium text-gray-500'>Type</dt>
          <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
            {event.type}
          </dd>
        </div>
        <div className='bg-green-100 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
          <dt className='flex items-center text-sm font-medium text-gray-500'>
            Description
          </dt>
          <dd className='overflow-y-auto max-h-20 mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
            {event.description}
          </dd>
        </div>
        <div className='bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
          <dt className='flex items-center text-sm font-medium text-gray-500'>
            Participants
          </dt>
          <dd className='overflow-y-auto max-h-14 mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
            {event.sharedParticipants
              && !event.sharedParticipants.length
              && 'There are no participants'}
            {event.sharedParticipants
              && event.sharedParticipants.map((participant) => (
                <div
                  key={participant.login}
                  className='flex items-center mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  <Avatar
                    className='pr-3'
                    alt='User settings'
                    img={
                      event.sharedParticipants
                        ? event.sharedParticipants.avatar
                        : ''
                    }
                  />
                  <p
                    className='cursor-pointer'
                    onClick={() => {
                      navigate(`/user/${event.sharedParticipants._id}`);
                      dispatch(infoEventOff());
                    }}>
                    {event.sharedParticipants
                      ? event.sharedParticipants.login
                      : ''}
                  </p>
                </div>
              ))}
          </dd>
        </div>
        <div className='bg-green-100 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
          <dt className='text-sm font-medium text-gray-500'>
            Start {event.allDay ? 'at' : '- End'}
          </dt>
          <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
            {new Date(event.startEvent).toLocaleString()} -{' '}
            {event.allDay ? (
              <b>( Event lasts all day )</b>
            ) : (
              new Date(event.endEvent).toLocaleString()
            )}
          </dd>
        </div>
      </dl>
      {event.author && event.author._id === me.id && <div className='border-t mt-3 py-3 px-4 border-gray-200'>
        <Checkbox disabled={event.type === 'holiday'} onChange={() => {
          dispatch(updateEvent({ ...event, isPerformed: !isPerformed }));
          setIsPerformed(!isPerformed);
        }} checked={isPerformed} className='cursor-pointer' id='remember' />
        <Label className='pl-5 cursor-pointer' htmlFor='remember'>
          Event is performed
        </Label>
        <div className='flex justify-between mt-5'>
          <Button disabled={event.type === 'holiday'} onClick={() => {
            dispatch(infoEventOff());
            dispatch(editEventOn());
          }} gradientMonochrome='cyan'>Edit Event</Button>
          <Button disabled={event.type === 'holiday'} onClick={() => {
            dispatch(deleteEvent({ id: event._id }));
            dispatch(infoEventOff());
          }} gradientMonochrome='failure'>Delete Event</Button>
        </div>
      </div>}
    </div>
  );
};
