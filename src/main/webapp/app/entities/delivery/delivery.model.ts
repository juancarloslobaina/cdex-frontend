import { IUser } from 'app/entities/user/user.model';

export interface IDelivery {
  id: number;
  cashAvailable?: number | null;
  location?: string | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewDelivery = Omit<IDelivery, 'id'> & { id: null };
