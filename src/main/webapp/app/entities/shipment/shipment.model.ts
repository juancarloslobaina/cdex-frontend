import dayjs from 'dayjs/esm';
import { IClient } from 'app/entities/client/client.model';
import { IProvider } from 'app/entities/provider/provider.model';
import { IDelivery } from 'app/entities/delivery/delivery.model';
import { IBeneficiary } from 'app/entities/beneficiary/beneficiary.model';
import { ShipmentStatus } from 'app/entities/enumerations/shipment-status.model';
import { ShiptmentType } from 'app/entities/enumerations/shiptment-type.model';

export interface IShipment {
  id: number;
  reference?: string | null;
  amount?: number | null;
  createdAt?: dayjs.Dayjs | null;
  status?: keyof typeof ShipmentStatus | null;
  type?: keyof typeof ShiptmentType | null;
  active?: boolean | null;
  screenshot?: string | null;
  screenshotContentType?: string | null;
  client?: Pick<IClient, 'id'> | null;
  provider?: Pick<IProvider, 'id'> | null;
  delivery?: Pick<IDelivery, 'id'> | null;
  beneficiary?: Pick<IBeneficiary, 'id'> | null;
}

export type NewShipment = Omit<IShipment, 'id'> & { id: null };
