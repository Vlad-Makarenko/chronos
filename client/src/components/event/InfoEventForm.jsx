import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { HiPaperClip } from 'react-icons/hi2';
import { useMessage } from '../../hooks/message.hook';
import { editEventOn } from '../../store/modalSlice';
import { updateEvent } from '../../store/eventSlice';
import { eventTypes } from '../../utils/event.utils';

export const InfoEventForm = () => {
  const dispatch = useDispatch();
  const message = useMessage();

  const { isLoading, event } = useSelector((state) => state.event);

  return (
    <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
      {/* <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-lg font-medium leading-6 text-gray-900'>
          Applicant Information
        </h3>
        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
          Personal details and application.
        </p>
      </div> */}
      <div className='border-t border-gray-200'>
        <dl>
          {/* если мы хотим поставить фон белый, вместо bg-gray-50 ----> bg-white */}
          {/* TODO: добавить цвет куда-то самого ивента, мб в названии, поиграться  с шрифтами,
          стянуть юзеров в participants и через мап на них ссылки поставить, стянуть автора,
          добавить кнопку выполнено или нет, и эдит */}
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Author</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {event.author}
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Name</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {event.name}
            </dd>
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Type</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {event.type}
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Description</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {event.description}
            </dd>
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Participants</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
              incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
              consequat sint. Sit id mollit nulla mollit nostrud in ea officia
              proident. Irure nostrud pariatur mollit ad adipisicing
              reprehenderit deserunt qui eu.
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Start - End</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {new Date(event.startEvent).toLocaleString()} -{' '}
              {new Date(event.startEvent).toLocaleString()}
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
    </div>
  );
};
