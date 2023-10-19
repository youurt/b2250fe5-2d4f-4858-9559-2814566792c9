import { EventifyEvent } from '@eventify-org/common-api';
import { createAction, props } from '@ngrx/store';

export const initEvents = createAction('[Events Page] Init');

/**
 * Load Events Api Actions.
 */
export const loadEvents = createAction('[Events/API] Load Events');
export const loadEventsSuccess = createAction(
  '[Events/API] Load Events Success',
  props<{ eventifyEvents: EventifyEvent[] }>()
);
export const loadEventsFailure = createAction(
  '[Events/API] Load Events Failure'
);
