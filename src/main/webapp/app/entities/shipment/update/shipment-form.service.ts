import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IShipment, NewShipment } from '../shipment.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IShipment for edit and NewShipmentFormGroupInput for create.
 */
type ShipmentFormGroupInput = IShipment | PartialWithRequiredKeyOf<NewShipment>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IShipment | NewShipment> = Omit<T, 'createdAt'> & {
  createdAt?: string | null;
};

type ShipmentFormRawValue = FormValueOf<IShipment>;

type NewShipmentFormRawValue = FormValueOf<NewShipment>;

type ShipmentFormDefaults = Pick<NewShipment, 'id' | 'createdAt' | 'active'>;

type ShipmentFormGroupContent = {
  id: FormControl<ShipmentFormRawValue['id'] | NewShipment['id']>;
  reference: FormControl<ShipmentFormRawValue['reference']>;
  amount: FormControl<ShipmentFormRawValue['amount']>;
  createdAt: FormControl<ShipmentFormRawValue['createdAt']>;
  status: FormControl<ShipmentFormRawValue['status']>;
  type: FormControl<ShipmentFormRawValue['type']>;
  active: FormControl<ShipmentFormRawValue['active']>;
  screenshot: FormControl<ShipmentFormRawValue['screenshot']>;
  screenshotContentType: FormControl<ShipmentFormRawValue['screenshotContentType']>;
  client: FormControl<ShipmentFormRawValue['client']>;
  provider: FormControl<ShipmentFormRawValue['provider']>;
  delivery: FormControl<ShipmentFormRawValue['delivery']>;
  beneficiary: FormControl<ShipmentFormRawValue['beneficiary']>;
};

export type ShipmentFormGroup = FormGroup<ShipmentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ShipmentFormService {
  createShipmentFormGroup(shipment: ShipmentFormGroupInput = { id: null }): ShipmentFormGroup {
    const shipmentRawValue = this.convertShipmentToShipmentRawValue({
      ...this.getFormDefaults(),
      ...shipment,
    });
    return new FormGroup<ShipmentFormGroupContent>({
      id: new FormControl(
        { value: shipmentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      reference: new FormControl(shipmentRawValue.reference, {
        validators: [Validators.required],
      }),
      amount: new FormControl(shipmentRawValue.amount, {
        validators: [Validators.required],
      }),
      createdAt: new FormControl(shipmentRawValue.createdAt, {
        validators: [Validators.required],
      }),
      status: new FormControl(shipmentRawValue.status, {
        validators: [Validators.required],
      }),
      type: new FormControl(shipmentRawValue.type, {
        validators: [Validators.required],
      }),
      active: new FormControl(shipmentRawValue.active, {
        validators: [Validators.required],
      }),
      screenshot: new FormControl(shipmentRawValue.screenshot, {
        validators: [Validators.required],
      }),
      screenshotContentType: new FormControl(shipmentRawValue.screenshotContentType),
      client: new FormControl(shipmentRawValue.client, {
        validators: [Validators.required],
      }),
      provider: new FormControl(shipmentRawValue.provider, {
        validators: [Validators.required],
      }),
      delivery: new FormControl(shipmentRawValue.delivery),
      beneficiary: new FormControl(shipmentRawValue.beneficiary, {
        validators: [Validators.required],
      }),
    });
  }

  getShipment(form: ShipmentFormGroup): IShipment | NewShipment {
    return this.convertShipmentRawValueToShipment(form.getRawValue() as ShipmentFormRawValue | NewShipmentFormRawValue);
  }

  resetForm(form: ShipmentFormGroup, shipment: ShipmentFormGroupInput): void {
    const shipmentRawValue = this.convertShipmentToShipmentRawValue({ ...this.getFormDefaults(), ...shipment });
    form.reset(
      {
        ...shipmentRawValue,
        id: { value: shipmentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ShipmentFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
      active: false,
    };
  }

  private convertShipmentRawValueToShipment(rawShipment: ShipmentFormRawValue | NewShipmentFormRawValue): IShipment | NewShipment {
    return {
      ...rawShipment,
      createdAt: dayjs(rawShipment.createdAt, DATE_TIME_FORMAT),
    };
  }

  private convertShipmentToShipmentRawValue(
    shipment: IShipment | (Partial<NewShipment> & ShipmentFormDefaults),
  ): ShipmentFormRawValue | PartialWithRequiredKeyOf<NewShipmentFormRawValue> {
    return {
      ...shipment,
      createdAt: shipment.createdAt ? shipment.createdAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
