import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';
import { NotificationStatus } from 'app/entities/enumerations/notification-status.model';

export interface INotification {
  id: number;
  reference?: string | null;
  createdAt?: dayjs.Dayjs | null;
  status?: keyof typeof NotificationStatus | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewNotification = Omit<INotification, 'id'> & { id: null };
