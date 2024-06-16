import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 14150,
  name: 'readily recess',
  description: 'over angelic',
};

export const sampleWithPartialData: IProduct = {
  id: 13845,
  name: 'careful',
  description: 'woodwind',
  active: true,
};

export const sampleWithFullData: IProduct = {
  id: 28304,
  name: 'ick',
  description: 'until unto boo',
  price: 16898.42,
  active: false,
};

export const sampleWithNewData: NewProduct = {
  name: 'times noir indeed',
  description: 'inasmuch',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
