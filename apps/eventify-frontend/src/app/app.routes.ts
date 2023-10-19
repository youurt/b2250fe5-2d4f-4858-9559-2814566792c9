import { Route } from '@angular/router';
import { AppComponent } from './app.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'events',
        loadChildren: () =>
          import('@eventify-org/events').then((module) => module.eventsRoutes),
      },
    ],
  },
];
