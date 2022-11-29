import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { HiSearch, HiPlus } from 'react-icons/hi';
import { CalendarCard } from '../components/calendar/CalendarCard';
import { getAllCalendars } from '../store/calendarSlice';
import { Loader } from '../components/Loader';
import { createCalendarOn } from '../store/modalSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [calendars, setCalendars] = useState([]);
  const { activeCalendars, isLoading } = useSelector((state) => state.calendar);
  useEffect(() => {
    dispatch(getAllCalendars());
  }, []);

  useEffect(() => {
    setCalendars(activeCalendars);
  }, [activeCalendars]);

  const searchHandler = (e) => {
    setSearch(e.target.value);
    const tempTags = [...activeCalendars];
    setCalendars(
      tempTags.filter((value) => value.name.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  };

  if (isLoading) {
    <Loader />;
  }
  return (
    <div className='container m-auto justify-end flex flex-col-reverse lg:flex-row w-full h-screen'>
      <div className='overflow-y-auto mt-6 h-3/6 lg:h-5/6 w-full lg:w-2/3'>
        <div className='flex mx-5 my-2 justify-between'>
          <h1 className='text-2xl my-2'>Your calendars</h1>
          <div className='flex items-center justify-center w-1/2 lg:w-1/3 border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400'>
            <HiSearch color='green' size='30' className='mx-3' />
            <input
              type='text'
              onChange={searchHandler}
              value={search}
              name='search'
              className='w-full bg-transparent border-0 p-3 focus:outline-none focus:border-0'
              placeholder='Search...'
            />
          </div>
        </div>
        <div className='flex mx-5 my-6 flex-wrap'>
          <div
            onClick={() => dispatch(createCalendarOn())}
            className='flex flex-col border items-center justify-center cursor-pointer w-5/12 lg:w-1/5 mx-3 my-5 border-green-400 rounded-lg p-1 pb-3 hover:shadow-md hover:shadow-green-400 duration-150'>
            <HiPlus color='green' size='60' />
            <span className='mt-3'>Create</span>
          </div>
          {calendars.map((calendar, idx) => (
            <CalendarCard key={idx} calendar={calendar} />
          ))}
        </div>
      </div>
      <div className='w-full lg:w-1/3'>
        <div className='overflow-y-auto h-3/6 lg:h-5/6 mt-6 border shadow-md shadow-green-400 border-green-200 rounded-xl'>
          <h1 className='text-2xl my-2'>Today Events</h1>
        </div>
      </div>
    </div>
  );
};
