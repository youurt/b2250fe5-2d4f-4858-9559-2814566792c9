import { EventifyEvent } from '@eventify-org/common-api';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as EventsActions from './events.actions';
export const EVENTS_FEATURE_KEY = 'events';

export interface EventifyEventsState extends EntityState<EventifyEvent> {
  loading: boolean;
}

export interface EventifyCartState extends EntityState<EventifyEvent> {
  adding: boolean;
}

export interface EventsState {
  eventifyEvents: EventifyEventsState;
  cart: EventifyCartState;
}

export interface EventsPartialState {
  readonly [EVENTS_FEATURE_KEY]: EventsState;
}

export const eventifyEventsAdapter: EntityAdapter<EventifyEvent> =
  createEntityAdapter<EventifyEvent>({
    selectId: (eventifyEvent) => eventifyEvent._id,
  });

export const cartAdapter: EntityAdapter<EventifyEvent> =
  createEntityAdapter<EventifyEvent>({
    selectId: (eventifyEvent) => eventifyEvent._id,
  });

export const initialEventifyEventsState: EventifyEventsState =
  eventifyEventsAdapter.getInitialState({
    loading: false,
  });

export const initialCartState: EventifyCartState = cartAdapter.getInitialState({
  adding: false,
});

export const initialEventsState: EventsState = {
  eventifyEvents: initialEventifyEventsState,
  cart: initialCartState,
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
  })),
  on(EventsActions.addEventToCart, (state, { event }) => ({
    ...state,
    cart: cartAdapter.addOne(event, {
      ...state.cart,
      adding: true,
    }),
    eventifyEvents: eventifyEventsAdapter.removeOne(event._id, {
      ...state.eventifyEvents,
      adding: true,
    }),
  })),
  on(EventsActions.addEventToCartSuccess, (state) => ({
    ...state,
    eventifyEvents: { ...state.eventifyEvents, adding: false },
  })),
  on(EventsActions.addEventToCartFailure, (state) => ({
    ...state,
    eventifyEvents: { ...state.eventifyEvents, adding: false },
  }))
);

export const eventsReducer = (
  state: EventsState | undefined,
  action: Action
) => {
  return reducer(state, action);
};
