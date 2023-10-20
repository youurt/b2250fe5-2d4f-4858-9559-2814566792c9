import { Route } from '@angular/router';
import { provideContentStore } from '@eventify-org/events/data-access';
import { EventsFeatureComponent } from './events-feature.component';
import { EventsComponent } from './events/events.component';

export const eventsRoutes: Route[] = [
  {
    path: '',
    component: EventsFeatureComponent,
    providers: [provideContentStore()],
    children: [
      {
        path: '',
        component: EventsComponent
      }
    ]
  }
];
