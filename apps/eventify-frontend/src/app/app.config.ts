import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled'
      }),
      withComponentInputBinding() // adds support for component input binding of route data and params
    ),
    provideAnimations(),
    provideHttpClient(),
    provideStore({ routerReducer: routerReducer }),
    provideEffects([]),
    provideStoreDevtools({ maxAge: 50 })
  ]
};
