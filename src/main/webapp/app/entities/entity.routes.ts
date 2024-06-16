import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'cdexApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'chat',
    data: { pageTitle: 'cdexApp.chat.home.title' },
    loadChildren: () => import('./chat/chat.routes'),
  },
  {
    path: 'provider',
    data: { pageTitle: 'cdexApp.provider.home.title' },
    loadChildren: () => import('./provider/provider.routes'),
  },
  {
    path: 'client',
    data: { pageTitle: 'cdexApp.client.home.title' },
    loadChildren: () => import('./client/client.routes'),
  },
  {
    path: 'delivery',
    data: { pageTitle: 'cdexApp.delivery.home.title' },
    loadChildren: () => import('./delivery/delivery.routes'),
  },
  {
    path: 'beneficiary',
    data: { pageTitle: 'cdexApp.beneficiary.home.title' },
    loadChildren: () => import('./beneficiary/beneficiary.routes'),
  },
  {
    path: 'shipment',
    data: { pageTitle: 'cdexApp.shipment.home.title' },
    loadChildren: () => import('./shipment/shipment.routes'),
  },
  {
    path: 'notification',
    data: { pageTitle: 'cdexApp.notification.home.title' },
    loadChildren: () => import('./notification/notification.routes'),
  },
  {
    path: 'product',
    data: { pageTitle: 'cdexApp.product.home.title' },
    loadChildren: () => import('./product/product.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
