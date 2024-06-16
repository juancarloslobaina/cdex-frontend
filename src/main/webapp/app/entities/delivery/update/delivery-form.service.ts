import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDelivery, NewDelivery } from '../delivery.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDelivery for edit and NewDeliveryFormGroupInput for create.
 */
type DeliveryFormGroupInput = IDelivery | PartialWithRequiredKeyOf<NewDelivery>;

type DeliveryFormDefaults = Pick<NewDelivery, 'id'>;

type DeliveryFormGroupContent = {
  id: FormControl<IDelivery['id'] | NewDelivery['id']>;
  cashAvailable: FormControl<IDelivery['cashAvailable']>;
  location: FormControl<IDelivery['location']>;
  user: FormControl<IDelivery['user']>;
};

export type DeliveryFormGroup = FormGroup<DeliveryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DeliveryFormService {
  createDeliveryFormGroup(delivery: DeliveryFormGroupInput = { id: null }): DeliveryFormGroup {
    const deliveryRawValue = {
      ...this.getFormDefaults(),
      ...delivery,
    };
    return new FormGroup<DeliveryFormGroupContent>({
      id: new FormControl(
        { value: deliveryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      cashAvailable: new FormControl(deliveryRawValue.cashAvailable, {
        validators: [Validators.required],
      }),
      location: new FormControl(deliveryRawValue.location),
      user: new FormControl(deliveryRawValue.user, {
        validators: [Validators.required],
      }),
    });
  }

  getDelivery(form: DeliveryFormGroup): IDelivery | NewDelivery {
    return form.getRawValue() as IDelivery | NewDelivery;
  }

  resetForm(form: DeliveryFormGroup, delivery: DeliveryFormGroupInput): void {
    const deliveryRawValue = { ...this.getFormDefaults(), ...delivery };
    form.reset(
      {
        ...deliveryRawValue,
        id: { value: deliveryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DeliveryFormDefaults {
    return {
      id: null,
    };
  }
}
