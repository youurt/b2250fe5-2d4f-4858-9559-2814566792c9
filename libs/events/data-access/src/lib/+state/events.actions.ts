import { EventifyEvent } from '@eventify-org/common-api';
import { createAction, props } from '@ngrx/store';

/**
 * Load Events Api Actions.
 */
export const loadEvents = createAction('[Events/API] Load Events');
export const loadEventsSuccess = createAction(
  '[Events/API] Load Events Success',
  props<{ eventifyEvents: EventifyEvent[] }>()
);
export const loadEventsFailure = createAction('[Events/API] Load Events Failure');
/**
 * Add Event To Cart Api Actions.
 */
export const addEventToCart = createAction('[Events/API] Add Event To Cart', props<{ event: EventifyEvent }>());
export const addEventToCartSuccess = createAction('[Events/API] Add Event To Cart Success');
export const addEventToCartFailure = createAction('[Events/API] Add Event To Cart Failure');
/**
 * Remove Event From Cart Api Actions.
 */
export const removeEventFromCart = createAction(
  '[Events/API] Remove Event From Cart',
  props<{ event: EventifyEvent }>()
);
export const removeEventFromCartSuccess = createAction('[Events/API] Remove Event From Cart Success');
export const removeEventFromCartFailure = createAction('[Events/API] Remove Event From Cart Failure');
