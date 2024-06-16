import dayjs from 'dayjs/esm';

import { IShipment, NewShipment } from './shipment.model';

export const sampleWithRequiredData: IShipment = {
  id: 5637,
  reference: 'seemingly ore',
  amount: 17512.46,
  createdAt: dayjs('2024-06-15T20:52'),
  status: 'CREATED',
  type: 'FOOD',
  active: false,
  screenshot: '../fake-data/blob/hipster.png',
  screenshotContentType: 'unknown',
};

export const sampleWithPartialData: IShipment = {
  id: 12793,
  reference: 'incline',
  amount: 31221.49,
  createdAt: dayjs('2024-06-16T06:18'),
  status: 'COMPLETED',
  type: 'MONEY',
  active: true,
  screenshot: '../fake-data/blob/hipster.png',
  screenshotContentType: 'unknown',
};

export const sampleWithFullData: IShipment = {
  id: 2192,
  reference: 'west',
  amount: 32652.28,
  createdAt: dayjs('2024-06-15T15:14'),
  status: 'ASSIGNED',
  type: 'FOOD',
  active: false,
  screenshot: '../fake-data/blob/hipster.png',
  screenshotContentType: 'unknown',
};

export const sampleWithNewData: NewShipment = {
  reference: 'whereas',
  amount: 25857.96,
  createdAt: dayjs('2024-06-16T03:33'),
  status: 'ACCEPTED',
  type: 'MONEY',
  active: true,
  screenshot: '../fake-data/blob/hipster.png',
  screenshotContentType: 'unknown',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
