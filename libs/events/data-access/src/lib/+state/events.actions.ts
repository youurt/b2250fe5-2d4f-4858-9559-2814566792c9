import { createAction, props } from '@ngrx/store';
import { EventsEntity } from './events.models';

export const initEvents = createAction('[Events Page] Init');

export const loadEventsSuccess = createAction(
  '[Events/API] Load Events Success',
  props<{ events: EventsEntity[] }>()
);

export const loadEventsFailure = createAction(
  '[Events/API] Load Events Failure',
  props<{ error: any }>()
);
