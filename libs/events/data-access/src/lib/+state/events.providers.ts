import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { EventsEffects } from './events.effects';
import { EVENTS_FEATURE_KEY, eventsReducer } from './events.reducer';

export const provideContentStore = (): EnvironmentProviders =>
  makeEnvironmentProviders([
    provideState(EVENTS_FEATURE_KEY, eventsReducer),
    provideEffects(EventsEffects),
  ]);
