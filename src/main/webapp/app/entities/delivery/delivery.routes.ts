import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DeliveryComponent } from './list/delivery.component';
import { DeliveryDetailComponent } from './detail/delivery-detail.component';
import { DeliveryUpdateComponent } from './update/delivery-update.component';
import DeliveryResolve from './route/delivery-routing-resolve.service';

const deliveryRoute: Routes = [
  {
    path: '',
    component: DeliveryComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DeliveryDetailComponent,
    resolve: {
      delivery: DeliveryResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DeliveryUpdateComponent,
    resolve: {
      delivery: DeliveryResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DeliveryUpdateComponent,
    resolve: {
      delivery: DeliveryResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default deliveryRoute;
