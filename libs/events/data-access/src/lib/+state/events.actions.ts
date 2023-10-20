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
export const addEventToCart = createAction(
  '[Events/API] Add Event To Cart',
  props<{ event: EventifyEvent }>()
);
export const addEventToCartSuccess = createAction(
  '[Events/API] Add Event To Cart Success'
);
export const addEventToCartFailure = createAction(
  '[Events/API] Add Event To Cart Failure'
);
