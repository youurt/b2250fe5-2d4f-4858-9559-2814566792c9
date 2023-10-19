import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as EventsActions from './events.actions';
import { EventsEntity } from './events.models';

export const EVENTS_FEATURE_KEY = 'events';

export interface EventsState extends EntityState<EventsEntity> {
  selectedId?: string | number; // which Events record has been selected
  loaded: boolean; // has the Events list been loaded
  error?: string | null; // last known error (if any)
}

export interface EventsPartialState {
  readonly [EVENTS_FEATURE_KEY]: EventsState;
}

export const eventsAdapter: EntityAdapter<EventsEntity> =
  createEntityAdapter<EventsEntity>();

export const initialEventsState: EventsState = eventsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialEventsState,
  on(EventsActions.initEvents, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(EventsActions.loadEventsSuccess, (state, { events }) =>
    eventsAdapter.setAll(events, { ...state, loaded: true })
  ),
  on(EventsActions.loadEventsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function eventsReducer(state: EventsState | undefined, action: Action) {
  return reducer(state, action);
}
