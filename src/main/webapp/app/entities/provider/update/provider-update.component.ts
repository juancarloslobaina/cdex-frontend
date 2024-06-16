import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { IClient } from 'app/entities/client/client.model';
import { ClientService } from 'app/entities/client/service/client.service';
import { IDelivery } from 'app/entities/delivery/delivery.model';
import { DeliveryService } from 'app/entities/delivery/service/delivery.service';
import { ProviderService } from '../service/provider.service';
import { IProvider } from '../provider.model';
import { ProviderFormService, ProviderFormGroup } from './provider-form.service';

@Component({
  standalone: true,
  selector: 'jhi-provider-update',
  templateUrl: './provider-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ProviderUpdateComponent implements OnInit {
  isSaving = false;
  provider: IProvider | null = null;

  usersSharedCollection: IUser[] = [];
  clientsSharedCollection: IClient[] = [];
  deliveriesSharedCollection: IDelivery[] = [];

  protected providerService = inject(ProviderService);
  protected providerFormService = inject(ProviderFormService);
  protected userService = inject(UserService);
  protected clientService = inject(ClientService);
  protected deliveryService = inject(DeliveryService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ProviderFormGroup = this.providerFormService.createProviderFormGroup();

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  compareClient = (o1: IClient | null, o2: IClient | null): boolean => this.clientService.compareClient(o1, o2);

  compareDelivery = (o1: IDelivery | null, o2: IDelivery | null): boolean => this.deliveryService.compareDelivery(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ provider }) => {
      this.provider = provider;
      if (provider) {
        this.updateForm(provider);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const provider = this.providerFormService.getProvider(this.editForm);
    if (provider.id !== null) {
      this.subscribeToSaveResponse(this.providerService.update(provider));
    } else {
      this.subscribeToSaveResponse(this.providerService.create(provider));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProvider>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(provider: IProvider): void {
    this.provider = provider;
    this.providerFormService.resetForm(this.editForm, provider);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, provider.user);
    this.clientsSharedCollection = this.clientService.addClientToCollectionIfMissing<IClient>(
      this.clientsSharedCollection,
      ...(provider.clients ?? []),
    );
    this.deliveriesSharedCollection = this.deliveryService.addDeliveryToCollectionIfMissing<IDelivery>(
      this.deliveriesSharedCollection,
      ...(provider.deliveries ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.provider?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.clientService
      .query()
      .pipe(map((res: HttpResponse<IClient[]>) => res.body ?? []))
      .pipe(
        map((clients: IClient[]) => this.clientService.addClientToCollectionIfMissing<IClient>(clients, ...(this.provider?.clients ?? []))),
      )
      .subscribe((clients: IClient[]) => (this.clientsSharedCollection = clients));

    this.deliveryService
      .query()
      .pipe(map((res: HttpResponse<IDelivery[]>) => res.body ?? []))
      .pipe(
        map((deliveries: IDelivery[]) =>
          this.deliveryService.addDeliveryToCollectionIfMissing<IDelivery>(deliveries, ...(this.provider?.deliveries ?? [])),
        ),
      )
      .subscribe((deliveries: IDelivery[]) => (this.deliveriesSharedCollection = deliveries));
  }
}
