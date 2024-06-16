import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IChat } from '../chat.model';
import { ChatService } from '../service/chat.service';

const chatResolve = (route: ActivatedRouteSnapshot): Observable<null | IChat> => {
  const id = route.params['id'];
  if (id) {
    return inject(ChatService)
      .find(id)
      .pipe(
        mergeMap((chat: HttpResponse<IChat>) => {
          if (chat.body) {
            return of(chat.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default chatResolve;
