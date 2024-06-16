import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../beneficiary.test-samples';

import { BeneficiaryFormService } from './beneficiary-form.service';

describe('Beneficiary Form Service', () => {
  let service: BeneficiaryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeneficiaryFormService);
  });

  describe('Service methods', () => {
    describe('createBeneficiaryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBeneficiaryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            alias: expect.any(Object),
            phone: expect.any(Object),
            city: expect.any(Object),
            address: expect.any(Object),
            referenceAddress: expect.any(Object),
            user: expect.any(Object),
          }),
        );
      });

      it('passing IBeneficiary should create a new form with FormGroup', () => {
        const formGroup = service.createBeneficiaryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            alias: expect.any(Object),
            phone: expect.any(Object),
            city: expect.any(Object),
            address: expect.any(Object),
            referenceAddress: expect.any(Object),
            user: expect.any(Object),
          }),
        );
      });
    });

    describe('getBeneficiary', () => {
      it('should return NewBeneficiary for default Beneficiary initial value', () => {
        const formGroup = service.createBeneficiaryFormGroup(sampleWithNewData);

        const beneficiary = service.getBeneficiary(formGroup) as any;

        expect(beneficiary).toMatchObject(sampleWithNewData);
      });

      it('should return NewBeneficiary for empty Beneficiary initial value', () => {
        const formGroup = service.createBeneficiaryFormGroup();

        const beneficiary = service.getBeneficiary(formGroup) as any;

        expect(beneficiary).toMatchObject({});
      });

      it('should return IBeneficiary', () => {
        const formGroup = service.createBeneficiaryFormGroup(sampleWithRequiredData);

        const beneficiary = service.getBeneficiary(formGroup) as any;

        expect(beneficiary).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBeneficiary should not enable id FormControl', () => {
        const formGroup = service.createBeneficiaryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBeneficiary should disable id FormControl', () => {
        const formGroup = service.createBeneficiaryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
