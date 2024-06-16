import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { BeneficiaryService } from '../service/beneficiary.service';
import { IBeneficiary } from '../beneficiary.model';
import { BeneficiaryFormService } from './beneficiary-form.service';

import { BeneficiaryUpdateComponent } from './beneficiary-update.component';

describe('Beneficiary Management Update Component', () => {
  let comp: BeneficiaryUpdateComponent;
  let fixture: ComponentFixture<BeneficiaryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let beneficiaryFormService: BeneficiaryFormService;
  let beneficiaryService: BeneficiaryService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BeneficiaryUpdateComponent],
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
      .overrideTemplate(BeneficiaryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BeneficiaryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    beneficiaryFormService = TestBed.inject(BeneficiaryFormService);
    beneficiaryService = TestBed.inject(BeneficiaryService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const beneficiary: IBeneficiary = { id: 456 };
      const user: IUser = { id: 8614 };
      beneficiary.user = user;

      const userCollection: IUser[] = [{ id: 20264 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ beneficiary });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const beneficiary: IBeneficiary = { id: 456 };
      const user: IUser = { id: 2342 };
      beneficiary.user = user;

      activatedRoute.data = of({ beneficiary });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.beneficiary).toEqual(beneficiary);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBeneficiary>>();
      const beneficiary = { id: 123 };
      jest.spyOn(beneficiaryFormService, 'getBeneficiary').mockReturnValue(beneficiary);
      jest.spyOn(beneficiaryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ beneficiary });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: beneficiary }));
      saveSubject.complete();

      // THEN
      expect(beneficiaryFormService.getBeneficiary).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(beneficiaryService.update).toHaveBeenCalledWith(expect.objectContaining(beneficiary));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBeneficiary>>();
      const beneficiary = { id: 123 };
      jest.spyOn(beneficiaryFormService, 'getBeneficiary').mockReturnValue({ id: null });
      jest.spyOn(beneficiaryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ beneficiary: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: beneficiary }));
      saveSubject.complete();

      // THEN
      expect(beneficiaryFormService.getBeneficiary).toHaveBeenCalled();
      expect(beneficiaryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBeneficiary>>();
      const beneficiary = { id: 123 };
      jest.spyOn(beneficiaryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ beneficiary });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(beneficiaryService.update).toHaveBeenCalled();
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
