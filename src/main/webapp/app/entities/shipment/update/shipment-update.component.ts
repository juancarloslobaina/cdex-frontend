import { Component, inject, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IClient } from 'app/entities/client/client.model';
import { ClientService } from 'app/entities/client/service/client.service';
import { IProvider } from 'app/entities/provider/provider.model';
import { ProviderService } from 'app/entities/provider/service/provider.service';
import { IDelivery } from 'app/entities/delivery/delivery.model';
import { DeliveryService } from 'app/entities/delivery/service/delivery.service';
import { IBeneficiary } from 'app/entities/beneficiary/beneficiary.model';
import { BeneficiaryService } from 'app/entities/beneficiary/service/beneficiary.service';
import { ShipmentStatus } from 'app/entities/enumerations/shipment-status.model';
import { ShiptmentType } from 'app/entities/enumerations/shiptment-type.model';
import { ShipmentService } from '../service/shipment.service';
import { IShipment } from '../shipment.model';
import { ShipmentFormService, ShipmentFormGroup } from './shipment-form.service';

@Component({
  standalone: true,
  selector: 'jhi-shipment-update',
  templateUrl: './shipment-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ShipmentUpdateComponent implements OnInit {
  isSaving = false;
  shipment: IShipment | null = null;
  shipmentStatusValues = Object.keys(ShipmentStatus);
  shiptmentTypeValues = Object.keys(ShiptmentType);

  clientsSharedCollection: IClient[] = [];
  providersSharedCollection: IProvider[] = [];
  deliveriesSharedCollection: IDelivery[] = [];
  beneficiariesSharedCollection: IBeneficiary[] = [];

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected shipmentService = inject(ShipmentService);
  protected shipmentFormService = inject(ShipmentFormService);
  protected clientService = inject(ClientService);
  protected providerService = inject(ProviderService);
  protected deliveryService = inject(DeliveryService);
  protected beneficiaryService = inject(BeneficiaryService);
  protected elementRef = inject(ElementRef);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ShipmentFormGroup = this.shipmentFormService.createShipmentFormGroup();

  compareClient = (o1: IClient | null, o2: IClient | null): boolean => this.clientService.compareClient(o1, o2);

  compareProvider = (o1: IProvider | null, o2: IProvider | null): boolean => this.providerService.compareProvider(o1, o2);

  compareDelivery = (o1: IDelivery | null, o2: IDelivery | null): boolean => this.deliveryService.compareDelivery(o1, o2);

  compareBeneficiary = (o1: IBeneficiary | null, o2: IBeneficiary | null): boolean => this.beneficiaryService.compareBeneficiary(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shipment }) => {
      this.shipment = shipment;
      if (shipment) {
        this.updateForm(shipment);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('cdexApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shipment = this.shipmentFormService.getShipment(this.editForm);
    if (shipment.id !== null) {
      this.subscribeToSaveResponse(this.shipmentService.update(shipment));
    } else {
      this.subscribeToSaveResponse(this.shipmentService.create(shipment));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShipment>>): void {
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

  protected updateForm(shipment: IShipment): void {
    this.shipment = shipment;
    this.shipmentFormService.resetForm(this.editForm, shipment);

    this.clientsSharedCollection = this.clientService.addClientToCollectionIfMissing<IClient>(
      this.clientsSharedCollection,
      shipment.client,
    );
    this.providersSharedCollection = this.providerService.addProviderToCollectionIfMissing<IProvider>(
      this.providersSharedCollection,
      shipment.provider,
    );
    this.deliveriesSharedCollection = this.deliveryService.addDeliveryToCollectionIfMissing<IDelivery>(
      this.deliveriesSharedCollection,
      shipment.delivery,
    );
    this.beneficiariesSharedCollection = this.beneficiaryService.addBeneficiaryToCollectionIfMissing<IBeneficiary>(
      this.beneficiariesSharedCollection,
      shipment.beneficiary,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.clientService
      .query()
      .pipe(map((res: HttpResponse<IClient[]>) => res.body ?? []))
      .pipe(map((clients: IClient[]) => this.clientService.addClientToCollectionIfMissing<IClient>(clients, this.shipment?.client)))
      .subscribe((clients: IClient[]) => (this.clientsSharedCollection = clients));

    this.providerService
      .query()
      .pipe(map((res: HttpResponse<IProvider[]>) => res.body ?? []))
      .pipe(
        map((providers: IProvider[]) =>
          this.providerService.addProviderToCollectionIfMissing<IProvider>(providers, this.shipment?.provider),
        ),
      )
      .subscribe((providers: IProvider[]) => (this.providersSharedCollection = providers));

    this.deliveryService
      .query()
      .pipe(map((res: HttpResponse<IDelivery[]>) => res.body ?? []))
      .pipe(
        map((deliveries: IDelivery[]) =>
          this.deliveryService.addDeliveryToCollectionIfMissing<IDelivery>(deliveries, this.shipment?.delivery),
        ),
      )
      .subscribe((deliveries: IDelivery[]) => (this.deliveriesSharedCollection = deliveries));

    this.beneficiaryService
      .query()
      .pipe(map((res: HttpResponse<IBeneficiary[]>) => res.body ?? []))
      .pipe(
        map((beneficiaries: IBeneficiary[]) =>
          this.beneficiaryService.addBeneficiaryToCollectionIfMissing<IBeneficiary>(beneficiaries, this.shipment?.beneficiary),
        ),
      )
      .subscribe((beneficiaries: IBeneficiary[]) => (this.beneficiariesSharedCollection = beneficiaries));
  }
}
