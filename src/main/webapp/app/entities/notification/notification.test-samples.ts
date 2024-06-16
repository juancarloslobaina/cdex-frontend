import dayjs from 'dayjs/esm';

import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: 6439,
  reference: 'energetically',
  createdAt: dayjs('2024-06-15T19:08'),
  status: 'READ',
};

export const sampleWithPartialData: INotification = {
  id: 18064,
  reference: 'distributor however',
  createdAt: dayjs('2024-06-16T13:57'),
  status: 'NEW',
};

export const sampleWithFullData: INotification = {
  id: 5292,
  reference: 'integral crochet that',
  createdAt: dayjs('2024-06-16T09:54'),
  status: 'NEW',
};

export const sampleWithNewData: NewNotification = {
  reference: 'codling',
  createdAt: dayjs('2024-06-16T09:37'),
  status: 'NEW',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
