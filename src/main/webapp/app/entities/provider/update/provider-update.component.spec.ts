import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { IClient } from 'app/entities/client/client.model';
import { ClientService } from 'app/entities/client/service/client.service';
import { IDelivery } from 'app/entities/delivery/delivery.model';
import { DeliveryService } from 'app/entities/delivery/service/delivery.service';
import { IProvider } from '../provider.model';
import { ProviderService } from '../service/provider.service';
import { ProviderFormService } from './provider-form.service';

import { ProviderUpdateComponent } from './provider-update.component';

describe('Provider Management Update Component', () => {
  let comp: ProviderUpdateComponent;
  let fixture: ComponentFixture<ProviderUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let providerFormService: ProviderFormService;
  let providerService: ProviderService;
  let userService: UserService;
  let clientService: ClientService;
  let deliveryService: DeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ProviderUpdateComponent],
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
      .overrideTemplate(ProviderUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProviderUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    providerFormService = TestBed.inject(ProviderFormService);
    providerService = TestBed.inject(ProviderService);
    userService = TestBed.inject(UserService);
    clientService = TestBed.inject(ClientService);
    deliveryService = TestBed.inject(DeliveryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const provider: IProvider = { id: 456 };
      const user: IUser = { id: 12764 };
      provider.user = user;

      const userCollection: IUser[] = [{ id: 21793 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ provider });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Client query and add missing value', () => {
      const provider: IProvider = { id: 456 };
      const clients: IClient[] = [{ id: 22493 }];
      provider.clients = clients;

      const clientCollection: IClient[] = [{ id: 8032 }];
      jest.spyOn(clientService, 'query').mockReturnValue(of(new HttpResponse({ body: clientCollection })));
      const additionalClients = [...clients];
      const expectedCollection: IClient[] = [...additionalClients, ...clientCollection];
      jest.spyOn(clientService, 'addClientToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ provider });
      comp.ngOnInit();

      expect(clientService.query).toHaveBeenCalled();
      expect(clientService.addClientToCollectionIfMissing).toHaveBeenCalledWith(
        clientCollection,
        ...additionalClients.map(expect.objectContaining),
      );
      expect(comp.clientsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Delivery query and add missing value', () => {
      const provider: IProvider = { id: 456 };
      const deliveries: IDelivery[] = [{ id: 10231 }];
      provider.deliveries = deliveries;

      const deliveryCollection: IDelivery[] = [{ id: 27962 }];
      jest.spyOn(deliveryService, 'query').mockReturnValue(of(new HttpResponse({ body: deliveryCollection })));
      const additionalDeliveries = [...deliveries];
      const expectedCollection: IDelivery[] = [...additionalDeliveries, ...deliveryCollection];
      jest.spyOn(deliveryService, 'addDeliveryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ provider });
      comp.ngOnInit();

      expect(deliveryService.query).toHaveBeenCalled();
      expect(deliveryService.addDeliveryToCollectionIfMissing).toHaveBeenCalledWith(
        deliveryCollection,
        ...additionalDeliveries.map(expect.objectContaining),
      );
      expect(comp.deliveriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const provider: IProvider = { id: 456 };
      const user: IUser = { id: 4707 };
      provider.user = user;
      const client: IClient = { id: 10804 };
      provider.clients = [client];
      const delivery: IDelivery = { id: 17283 };
      provider.deliveries = [delivery];

      activatedRoute.data = of({ provider });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.clientsSharedCollection).toContain(client);
      expect(comp.deliveriesSharedCollection).toContain(delivery);
      expect(comp.provider).toEqual(provider);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProvider>>();
      const provider = { id: 123 };
      jest.spyOn(providerFormService, 'getProvider').mockReturnValue(provider);
      jest.spyOn(providerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ provider });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: provider }));
      saveSubject.complete();

      // THEN
      expect(providerFormService.getProvider).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(providerService.update).toHaveBeenCalledWith(expect.objectContaining(provider));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProvider>>();
      const provider = { id: 123 };
      jest.spyOn(providerFormService, 'getProvider').mockReturnValue({ id: null });
      jest.spyOn(providerService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ provider: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: provider }));
      saveSubject.complete();

      // THEN
      expect(providerFormService.getProvider).toHaveBeenCalled();
      expect(providerService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProvider>>();
      const provider = { id: 123 };
      jest.spyOn(providerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ provider });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(providerService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareClient', () => {
      it('Should forward to clientService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(clientService, 'compareClient');
        comp.compareClient(entity, entity2);
        expect(clientService.compareClient).toHaveBeenCalledWith(entity, entity2);
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
  });
});
