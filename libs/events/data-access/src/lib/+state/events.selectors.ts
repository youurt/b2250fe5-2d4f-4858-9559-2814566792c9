import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EVENTS_FEATURE_KEY,
  EventsState,
  eventifyEventsAdapter,
} from './events.reducer';

// Lookup the 'Events' feature state managed by NgRx
export const selectEventsState =
  createFeatureSelector<EventsState>(EVENTS_FEATURE_KEY);

const { selectAll } = eventifyEventsAdapter.getSelectors();

const eventifyEventsState = createSelector(
  selectEventsState,
  (state) => state.eventifyEvents
);

export const getEvents = createSelector(eventifyEventsState, (state) =>
  selectAll(state)
);
