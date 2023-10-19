import { EventifyEvent } from '@eventify-org/common-api';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as EventsActions from './events.actions';
export const EVENTS_FEATURE_KEY = 'events';

export interface EventifyEventsState extends EntityState<EventifyEvent> {
  loading: boolean;
}

export interface EventsState {
  eventifyEvents: EventifyEventsState;
}

export interface EventsPartialState {
  readonly [EVENTS_FEATURE_KEY]: EventsState;
}

export const eventifyEventsAdapter: EntityAdapter<EventifyEvent> =
  createEntityAdapter<EventifyEvent>({
    selectId: (eventifyEvent) => eventifyEvent._id,
  });

export const initialEventifyEventsState: EventifyEventsState =
  eventifyEventsAdapter.getInitialState({
    loading: false,
  });

export const initialEventsState: EventsState = {
  eventifyEvents: initialEventifyEventsState,
};

const reducer = createReducer(
  initialEventsState,
  on(EventsActions.loadEvents, (state) => ({
    ...state,
    eventifyEvents: { ...state.eventifyEvents, loading: true },
  })),
  on(EventsActions.loadEventsSuccess, (state, { eventifyEvents }) => ({
    ...state,
    eventifyEvents: eventifyEventsAdapter.setMany(eventifyEvents, {
      ...state.eventifyEvents,
      loading: false,
    }),
  })),
  on(EventsActions.loadEventsSuccess, (state) => ({
    ...state,
    eventifyEvents: { ...state.eventifyEvents, loading: false },
  }))
);

export const eventsReducer = (
  state: EventsState | undefined,
  action: Action
) => {
  return reducer(state, action);
};
