import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 26224,
  login: 'W',
};

export const sampleWithPartialData: IUser = {
  id: 2633,
  login: '=@Kkq\\u8K\\fB\\6ZL8Tgd',
};

export const sampleWithFullData: IUser = {
  id: 25855,
  login: 'skC',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
