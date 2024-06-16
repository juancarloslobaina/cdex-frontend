import dayjs from 'dayjs/esm';

import { IChat, NewChat } from './chat.model';

export const sampleWithRequiredData: IChat = {
  id: 28842,
  message: 'round member',
  createdAt: dayjs('2024-06-16T01:41'),
};

export const sampleWithPartialData: IChat = {
  id: 15859,
  message: 'fairness gadzooks upon',
  createdAt: dayjs('2024-06-16T04:50'),
};

export const sampleWithFullData: IChat = {
  id: 20379,
  message: 'amid',
  createdAt: dayjs('2024-06-16T04:12'),
  status: 'DELETED',
};

export const sampleWithNewData: NewChat = {
  message: 'if equally',
  createdAt: dayjs('2024-06-16T05:26'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
