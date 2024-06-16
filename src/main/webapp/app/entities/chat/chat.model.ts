import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';
import { MessageStatus } from 'app/entities/enumerations/message-status.model';

export interface IChat {
  id: number;
  message?: string | null;
  createdAt?: dayjs.Dayjs | null;
  status?: keyof typeof MessageStatus | null;
  from?: Pick<IUser, 'id' | 'login'> | null;
  to?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewChat = Omit<IChat, 'id'> & { id: null };
