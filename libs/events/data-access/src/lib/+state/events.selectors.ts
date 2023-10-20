import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EVENTS_FEATURE_KEY,
  EventsState,
  eventifyEventsAdapter,
} from './events.reducer';

// Lookup the 'Events' feature state managed by NgRx
export const selectEventsState =
  createFeatureSelector<EventsState>(EVENTS_FEATURE_KEY);

const { selectAll: selectAllEvents } = eventifyEventsAdapter.getSelectors();

const eventifyEventsState = createSelector(
  selectEventsState,
  (state) => state.eventifyEvents
);

export const getEvents = createSelector(eventifyEventsState, (state) =>
  selectAllEvents(state)
);

const { selectAll: selectAllCart } = eventifyEventsAdapter.getSelectors();

const cartState = createSelector(selectEventsState, (state) => state.cart);

export const getCart = createSelector(cartState, (state) =>
  selectAllCart(state)
);
