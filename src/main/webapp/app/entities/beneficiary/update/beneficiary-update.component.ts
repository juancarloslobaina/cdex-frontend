import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { IBeneficiary } from '../beneficiary.model';
import { BeneficiaryService } from '../service/beneficiary.service';
import { BeneficiaryFormService, BeneficiaryFormGroup } from './beneficiary-form.service';

@Component({
  standalone: true,
  selector: 'jhi-beneficiary-update',
  templateUrl: './beneficiary-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class BeneficiaryUpdateComponent implements OnInit {
  isSaving = false;
  beneficiary: IBeneficiary | null = null;

  usersSharedCollection: IUser[] = [];

  protected beneficiaryService = inject(BeneficiaryService);
  protected beneficiaryFormService = inject(BeneficiaryFormService);
  protected userService = inject(UserService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: BeneficiaryFormGroup = this.beneficiaryFormService.createBeneficiaryFormGroup();

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ beneficiary }) => {
      this.beneficiary = beneficiary;
      if (beneficiary) {
        this.updateForm(beneficiary);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const beneficiary = this.beneficiaryFormService.getBeneficiary(this.editForm);
    if (beneficiary.id !== null) {
      this.subscribeToSaveResponse(this.beneficiaryService.update(beneficiary));
    } else {
      this.subscribeToSaveResponse(this.beneficiaryService.create(beneficiary));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBeneficiary>>): void {
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

  protected updateForm(beneficiary: IBeneficiary): void {
    this.beneficiary = beneficiary;
    this.beneficiaryFormService.resetForm(this.editForm, beneficiary);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, beneficiary.user);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.beneficiary?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
