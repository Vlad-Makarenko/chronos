import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'flowbite-react';
import Select from 'react-select';

import { Loader } from '../Loader';

export const InfoEventForm = () => {
  const dispatch = useDispatch();

  const { eventLoading, event } = useSelector((state) => state.event);

  if (eventLoading) return <Loader />;
  return (
    <div className='overflow-hidden bg-white animate-appear sm:rounded-lg'>
      <dl>
        {/* если мы хотим поставить фон белый, вместо bg-gray-50 ----> bg-white */}
        {/* TODO: добавить цвет куда-то самого ивента, мб в названии, поиграться  с шрифтами,
          стянуть юзеров в participants и через мап на них ссылки поставить, стянуть автора,
          добавить кнопку выполнено или нет, и эдит */}
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
            <p className='cursor-pointer' onClick={() => console.log('loh')}>
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
          <dt className='text-sm font-medium text-gray-500'>Description</dt>
          <dd className='overflow-y-auto max-h-20 mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
            {event.description}
          </dd>
        </div>
        <div className='bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
          <dt className='flex items-center text-sm font-medium text-gray-500'>
            Participants
          </dt>
          <dd className='overflow-y-auto max-h-14 mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
            {event.sharedParticipants && !event.sharedParticipants.length && 'There are no participants' }
            {event.sharedParticipants
              && event.sharedParticipants.map((participant) => (
                <div key={participant.login} className='flex items-center mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  <Avatar
                    className='pr-3'
                    alt='User settings'
                    img={event.sharedParticipants ? event.sharedParticipants.avatar : ''}
                  />
                  <p
                    className='cursor-pointer'
                    onClick={() => console.log('loh')}>
                    {event.sharedParticipants ? event.sharedParticipants.login : ''}
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
            {event.allDay
              ? '( It\'s all day event )'
              : new Date(event.startEvent).toLocaleString()}
          </dd>
        </div>
        {/* <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Attachments</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              <ul
                role='list'
                className='divide-y divide-gray-200 rounded-md border border-gray-200'>
                <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                  <div className='flex w-0 flex-1 items-center'>
                    <HiPaperClip
                      className='h-5 w-5 flex-shrink-0 text-gray-400'
                      aria-hidden='true'
                    />
                    <span className='ml-2 w-0 flex-1 truncate'>
                      resume_back_end_developer.pdf
                    </span>
                  </div>
                  <div className='ml-4 flex-shrink-0'>
                    <a
                      href='#'
                      className='font-medium text-indigo-600 hover:text-indigo-500'>
                      Download
                    </a>
                  </div>
                </li>
                <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                  <div className='flex w-0 flex-1 items-center'>
                    <HiPaperClip
                      className='h-5 w-5 flex-shrink-0 text-gray-400'
                      aria-hidden='true'
                    />
                    <span className='ml-2 w-0 flex-1 truncate'>
                      coverletter_back_end_developer.pdf
                    </span>
                  </div>
                  <div className='ml-4 flex-shrink-0'>
                    <a
                      href='#'
                      className='font-medium text-indigo-600 hover:text-indigo-500'>
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div> */}
      </dl>
    </div>
  );
};
