import { IProvider, NewProvider } from './provider.model';

export const sampleWithRequiredData: IProvider = {
  id: 15268,
  referralCode: 'phooey despite instead',
};

export const sampleWithPartialData: IProvider = {
  id: 28584,
  referralCode: 'ick disloyal',
};

export const sampleWithFullData: IProvider = {
  id: 28515,
  referralCode: 'dab puzzled',
};

export const sampleWithNewData: NewProvider = {
  referralCode: 'difficult in',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
