import { IBeneficiary, NewBeneficiary } from './beneficiary.model';

export const sampleWithRequiredData: IBeneficiary = {
  id: 6169,
  alias: 'past',
  phone: '941 821 876',
  city: 'Granollers',
};

export const sampleWithPartialData: IBeneficiary = {
  id: 26292,
  alias: 'yet after',
  phone: '934542122',
  city: 'Alicante',
};

export const sampleWithFullData: IBeneficiary = {
  id: 8806,
  alias: 'worth redeem',
  phone: '987219931',
  city: 'Alcoy',
  address: 'baggie duh',
  referenceAddress: 'cornflakes astride yowza',
};

export const sampleWithNewData: NewBeneficiary = {
  alias: 'amid clout',
  phone: '919-029-385',
  city: 'Madrid',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
