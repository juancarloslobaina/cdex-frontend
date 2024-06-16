import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { BeneficiaryComponent } from './list/beneficiary.component';
import { BeneficiaryDetailComponent } from './detail/beneficiary-detail.component';
import { BeneficiaryUpdateComponent } from './update/beneficiary-update.component';
import BeneficiaryResolve from './route/beneficiary-routing-resolve.service';

const beneficiaryRoute: Routes = [
  {
    path: '',
    component: BeneficiaryComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BeneficiaryDetailComponent,
    resolve: {
      beneficiary: BeneficiaryResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BeneficiaryUpdateComponent,
    resolve: {
      beneficiary: BeneficiaryResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BeneficiaryUpdateComponent,
    resolve: {
      beneficiary: BeneficiaryResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default beneficiaryRoute;
