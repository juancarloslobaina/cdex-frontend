import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDelivery } from '../delivery.model';
import { DeliveryService } from '../service/delivery.service';

const deliveryResolve = (route: ActivatedRouteSnapshot): Observable<null | IDelivery> => {
  const id = route.params['id'];
  if (id) {
    return inject(DeliveryService)
      .find(id)
      .pipe(
        mergeMap((delivery: HttpResponse<IDelivery>) => {
          if (delivery.body) {
            return of(delivery.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default deliveryResolve;
