import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EVENTS_FEATURE_KEY,
  EventsState,
  eventsAdapter,
} from './events.reducer';

// Lookup the 'Events' feature state managed by NgRx
export const selectEventsState =
  createFeatureSelector<EventsState>(EVENTS_FEATURE_KEY);

const { selectAll, selectEntities } = eventsAdapter.getSelectors();

export const selectEventsLoaded = createSelector(
  selectEventsState,
  (state: EventsState) => state.loaded
);

export const selectEventsError = createSelector(
  selectEventsState,
  (state: EventsState) => state.error
);

export const selectAllEvents = createSelector(
  selectEventsState,
  (state: EventsState) => selectAll(state)
);

export const selectEventsEntities = createSelector(
  selectEventsState,
  (state: EventsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectEventsState,
  (state: EventsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectEventsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
