import { IUser } from 'app/entities/user/user.model';

export interface IBeneficiary {
  id: number;
  alias?: string | null;
  phone?: string | null;
  city?: string | null;
  address?: string | null;
  referenceAddress?: string | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewBeneficiary = Omit<IBeneficiary, 'id'> & { id: null };
