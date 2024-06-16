import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDelivery, NewDelivery } from '../delivery.model';

export type PartialUpdateDelivery = Partial<IDelivery> & Pick<IDelivery, 'id'>;

export type EntityResponseType = HttpResponse<IDelivery>;
export type EntityArrayResponseType = HttpResponse<IDelivery[]>;

@Injectable({ providedIn: 'root' })
export class DeliveryService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/deliveries');

  create(delivery: NewDelivery): Observable<EntityResponseType> {
    return this.http.post<IDelivery>(this.resourceUrl, delivery, { observe: 'response' });
  }

  update(delivery: IDelivery): Observable<EntityResponseType> {
    return this.http.put<IDelivery>(`${this.resourceUrl}/${this.getDeliveryIdentifier(delivery)}`, delivery, { observe: 'response' });
  }

  partialUpdate(delivery: PartialUpdateDelivery): Observable<EntityResponseType> {
    return this.http.patch<IDelivery>(`${this.resourceUrl}/${this.getDeliveryIdentifier(delivery)}`, delivery, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDelivery>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDelivery[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDeliveryIdentifier(delivery: Pick<IDelivery, 'id'>): number {
    return delivery.id;
  }

  compareDelivery(o1: Pick<IDelivery, 'id'> | null, o2: Pick<IDelivery, 'id'> | null): boolean {
    return o1 && o2 ? this.getDeliveryIdentifier(o1) === this.getDeliveryIdentifier(o2) : o1 === o2;
  }

  addDeliveryToCollectionIfMissing<Type extends Pick<IDelivery, 'id'>>(
    deliveryCollection: Type[],
    ...deliveriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const deliveries: Type[] = deliveriesToCheck.filter(isPresent);
    if (deliveries.length > 0) {
      const deliveryCollectionIdentifiers = deliveryCollection.map(deliveryItem => this.getDeliveryIdentifier(deliveryItem));
      const deliveriesToAdd = deliveries.filter(deliveryItem => {
        const deliveryIdentifier = this.getDeliveryIdentifier(deliveryItem);
        if (deliveryCollectionIdentifiers.includes(deliveryIdentifier)) {
          return false;
        }
        deliveryCollectionIdentifiers.push(deliveryIdentifier);
        return true;
      });
      return [...deliveriesToAdd, ...deliveryCollection];
    }
    return deliveryCollection;
  }
}
