import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { DeliveryService } from '../service/delivery.service';
import { IDelivery } from '../delivery.model';
import { DeliveryFormService } from './delivery-form.service';

import { DeliveryUpdateComponent } from './delivery-update.component';

describe('Delivery Management Update Component', () => {
  let comp: DeliveryUpdateComponent;
  let fixture: ComponentFixture<DeliveryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let deliveryFormService: DeliveryFormService;
  let deliveryService: DeliveryService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DeliveryUpdateComponent],
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
      .overrideTemplate(DeliveryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DeliveryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    deliveryFormService = TestBed.inject(DeliveryFormService);
    deliveryService = TestBed.inject(DeliveryService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const delivery: IDelivery = { id: 456 };
      const user: IUser = { id: 21462 };
      delivery.user = user;

      const userCollection: IUser[] = [{ id: 28080 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ delivery });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const delivery: IDelivery = { id: 456 };
      const user: IUser = { id: 2869 };
      delivery.user = user;

      activatedRoute.data = of({ delivery });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.delivery).toEqual(delivery);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDelivery>>();
      const delivery = { id: 123 };
      jest.spyOn(deliveryFormService, 'getDelivery').mockReturnValue(delivery);
      jest.spyOn(deliveryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ delivery });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: delivery }));
      saveSubject.complete();

      // THEN
      expect(deliveryFormService.getDelivery).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(deliveryService.update).toHaveBeenCalledWith(expect.objectContaining(delivery));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDelivery>>();
      const delivery = { id: 123 };
      jest.spyOn(deliveryFormService, 'getDelivery').mockReturnValue({ id: null });
      jest.spyOn(deliveryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ delivery: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: delivery }));
      saveSubject.complete();

      // THEN
      expect(deliveryFormService.getDelivery).toHaveBeenCalled();
      expect(deliveryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDelivery>>();
      const delivery = { id: 123 };
      jest.spyOn(deliveryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ delivery });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(deliveryService.update).toHaveBeenCalled();
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
  });
});
