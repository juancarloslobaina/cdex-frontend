import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ChatComponent } from './list/chat.component';
import { ChatDetailComponent } from './detail/chat-detail.component';
import { ChatUpdateComponent } from './update/chat-update.component';
import ChatResolve from './route/chat-routing-resolve.service';

const chatRoute: Routes = [
  {
    path: '',
    component: ChatComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChatDetailComponent,
    resolve: {
      chat: ChatResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChatUpdateComponent,
    resolve: {
      chat: ChatResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChatUpdateComponent,
    resolve: {
      chat: ChatResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default chatRoute;
