import { IUser } from 'app/entities/user/user.model';
import { IClient } from 'app/entities/client/client.model';
import { IDelivery } from 'app/entities/delivery/delivery.model';

export interface IProvider {
  id: number;
  referralCode?: string | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
  clients?: Pick<IClient, 'id'>[] | null;
  deliveries?: Pick<IDelivery, 'id'>[] | null;
}

export type NewProvider = Omit<IProvider, 'id'> & { id: null };
