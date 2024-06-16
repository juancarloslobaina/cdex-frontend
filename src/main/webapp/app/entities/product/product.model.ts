import { IProvider } from 'app/entities/provider/provider.model';

export interface IProduct {
  id: number;
  name?: string | null;
  description?: string | null;
  price?: number | null;
  active?: boolean | null;
  provider?: Pick<IProvider, 'id'> | null;
}

export type NewProduct = Omit<IProduct, 'id'> & { id: null };
