import { IDelivery, NewDelivery } from './delivery.model';

export const sampleWithRequiredData: IDelivery = {
  id: 776,
  cashAvailable: 26080.33,
};

export const sampleWithPartialData: IDelivery = {
  id: 18535,
  cashAvailable: 9794.77,
};

export const sampleWithFullData: IDelivery = {
  id: 7758,
  cashAvailable: 20328.35,
  location: 'rib',
};

export const sampleWithNewData: NewDelivery = {
  cashAvailable: 29721.1,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
