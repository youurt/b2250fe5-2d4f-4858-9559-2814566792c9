import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@eventify-org/events').then(module => module.eventsRoutes)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
