import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IClient } from 'app/entities/client/client.model';
import { ClientService } from 'app/entities/client/service/client.service';
import { IProvider } from 'app/entities/provider/provider.model';
import { ProviderService } from 'app/entities/provider/service/provider.service';
import { IDelivery } from 'app/entities/delivery/delivery.model';
import { DeliveryService } from 'app/entities/delivery/service/delivery.service';
import { IBeneficiary } from 'app/entities/beneficiary/beneficiary.model';
import { BeneficiaryService } from 'app/entities/beneficiary/service/beneficiary.service';
import { IShipment } from '../shipment.model';
import { ShipmentService } from '../service/shipment.service';
import { ShipmentFormService } from './shipment-form.service';

import { ShipmentUpdateComponent } from './shipment-update.component';

describe('Shipment Management Update Component', () => {
  let comp: ShipmentUpdateComponent;
  let fixture: ComponentFixture<ShipmentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let shipmentFormService: ShipmentFormService;
  let shipmentService: ShipmentService;
  let clientService: ClientService;
  let providerService: ProviderService;
  let deliveryService: DeliveryService;
  let beneficiaryService: BeneficiaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ShipmentUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ShipmentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ShipmentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    shipmentFormService = TestBed.inject(ShipmentFormService);
    shipmentService = TestBed.inject(ShipmentService);
    clientService = TestBed.inject(ClientService);
    providerService = TestBed.inject(ProviderService);
    deliveryService = TestBed.inject(DeliveryService);
    beneficiaryService = TestBed.inject(BeneficiaryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Client query and add missing value', () => {
      const shipment: IShipment = { id: 456 };
      const client: IClient = { id: 4381 };
      shipment.client = client;

      const clientCollection: IClient[] = [{ id: 23802 }];
      jest.spyOn(clientService, 'query').mockReturnValue(of(new HttpResponse({ body: clientCollection })));
      const additionalClients = [client];
      const expectedCollection: IClient[] = [...additionalClients, ...clientCollection];
      jest.spyOn(clientService, 'addClientToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ shipment });
      comp.ngOnInit();

      expect(clientService.query).toHaveBeenCalled();
      expect(clientService.addClientToCollectionIfMissing).toHaveBeenCalledWith(
        clientCollection,
        ...additionalClients.map(expect.objectContaining),
      );
      expect(comp.clientsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Provider query and add missing value', () => {
      const shipment: IShipment = { id: 456 };
      const provider: IProvider = { id: 15245 };
      shipment.provider = provider;

      const providerCollection: IProvider[] = [{ id: 1668 }];
      jest.spyOn(providerService, 'query').mockReturnValue(of(new HttpResponse({ body: providerCollection })));
      const additionalProviders = [provider];
      const expectedCollection: IProvider[] = [...additionalProviders, ...providerCollection];
      jest.spyOn(providerService, 'addProviderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ shipment });
      comp.ngOnInit();

      expect(providerService.query).toHaveBeenCalled();
      expect(providerService.addProviderToCollectionIfMissing).toHaveBeenCalledWith(
        providerCollection,
        ...additionalProviders.map(expect.objectContaining),
      );
      expect(comp.providersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Delivery query and add missing value', () => {
      const shipment: IShipment = { id: 456 };
      const delivery: IDelivery = { id: 32707 };
      shipment.delivery = delivery;

      const deliveryCollection: IDelivery[] = [{ id: 1384 }];
      jest.spyOn(deliveryService, 'query').mockReturnValue(of(new HttpResponse({ body: deliveryCollection })));
      const additionalDeliveries = [delivery];
      const expectedCollection: IDelivery[] = [...additionalDeliveries, ...deliveryCollection];
      jest.spyOn(deliveryService, 'addDeliveryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ shipment });
      comp.ngOnInit();

      expect(deliveryService.query).toHaveBeenCalled();
      expect(deliveryService.addDeliveryToCollectionIfMissing).toHaveBeenCalledWith(
        deliveryCollection,
        ...additionalDeliveries.map(expect.objectContaining),
      );
      expect(comp.deliveriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Beneficiary query and add missing value', () => {
      const shipment: IShipment = { id: 456 };
      const beneficiary: IBeneficiary = { id: 8233 };
      shipment.beneficiary = beneficiary;

      const beneficiaryCollection: IBeneficiary[] = [{ id: 32079 }];
      jest.spyOn(beneficiaryService, 'query').mockReturnValue(of(new HttpResponse({ body: beneficiaryCollection })));
      const additionalBeneficiaries = [beneficiary];
      const expectedCollection: IBeneficiary[] = [...additionalBeneficiaries, ...beneficiaryCollection];
      jest.spyOn(beneficiaryService, 'addBeneficiaryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ shipment });
      comp.ngOnInit();

      expect(beneficiaryService.query).toHaveBeenCalled();
      expect(beneficiaryService.addBeneficiaryToCollectionIfMissing).toHaveBeenCalledWith(
        beneficiaryCollection,
        ...additionalBeneficiaries.map(expect.objectContaining),
      );
      expect(comp.beneficiariesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const shipment: IShipment = { id: 456 };
      const client: IClient = { id: 3924 };
      shipment.client = client;
      const provider: IProvider = { id: 30633 };
      shipment.provider = provider;
      const delivery: IDelivery = { id: 31563 };
      shipment.delivery = delivery;
      const beneficiary: IBeneficiary = { id: 7388 };
      shipment.beneficiary = beneficiary;

      activatedRoute.data = of({ shipment });
      comp.ngOnInit();

      expect(comp.clientsSharedCollection).toContain(client);
      expect(comp.providersSharedCollection).toContain(provider);
      expect(comp.deliveriesSharedCollection).toContain(delivery);
      expect(comp.beneficiariesSharedCollection).toContain(beneficiary);
      expect(comp.shipment).toEqual(shipment);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IShipment>>();
      const shipment = { id: 123 };
      jest.spyOn(shipmentFormService, 'getShipment').mockReturnValue(shipment);
      jest.spyOn(shipmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shipment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shipment }));
      saveSubject.complete();

      // THEN
      expect(shipmentFormService.getShipment).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(shipmentService.update).toHaveBeenCalledWith(expect.objectContaining(shipment));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IShipment>>();
      const shipment = { id: 123 };
      jest.spyOn(shipmentFormService, 'getShipment').mockReturnValue({ id: null });
      jest.spyOn(shipmentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shipment: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shipment }));
      saveSubject.complete();

      // THEN
      expect(shipmentFormService.getShipment).toHaveBeenCalled();
      expect(shipmentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IShipment>>();
      const shipment = { id: 123 };
      jest.spyOn(shipmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shipment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(shipmentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareClient', () => {
      it('Should forward to clientService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(clientService, 'compareClient');
        comp.compareClient(entity, entity2);
        expect(clientService.compareClient).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareProvider', () => {
      it('Should forward to providerService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(providerService, 'compareProvider');
        comp.compareProvider(entity, entity2);
        expect(providerService.compareProvider).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDelivery', () => {
      it('Should forward to deliveryService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(deliveryService, 'compareDelivery');
        comp.compareDelivery(entity, entity2);
        expect(deliveryService.compareDelivery).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareBeneficiary', () => {
      it('Should forward to beneficiaryService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(beneficiaryService, 'compareBeneficiary');
        comp.compareBeneficiary(entity, entity2);
        expect(beneficiaryService.compareBeneficiary).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
