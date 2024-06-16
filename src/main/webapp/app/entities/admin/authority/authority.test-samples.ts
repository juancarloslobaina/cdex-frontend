import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: 'fa5dab08-2737-45e4-816c-d58459cc46be',
};

export const sampleWithPartialData: IAuthority = {
  name: '030a0fdf-905a-44a5-a76d-0734853dcefd',
};

export const sampleWithFullData: IAuthority = {
  name: 'd5ffd2e7-60d7-43b1-b62e-40a46384e00a',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
