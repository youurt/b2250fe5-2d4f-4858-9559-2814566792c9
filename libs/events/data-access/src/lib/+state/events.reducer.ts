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

export const eventifyEventsAdapter: EntityAdapter<EventifyEvent> = createEntityAdapter<EventifyEvent>({
  selectId: eventifyEvent => eventifyEvent._id
});

export const cartAdapter: EntityAdapter<EventifyEvent> = createEntityAdapter<EventifyEvent>({
  selectId: eventifyEvent => eventifyEvent._id
});

export const initialEventifyEventsState: EventifyEventsState = eventifyEventsAdapter.getInitialState({
  loading: false
});

export const initialCartState: EventifyCartState = cartAdapter.getInitialState({
  adding: false
});

export const initialEventsState: EventsState = {
  eventifyEvents: initialEventifyEventsState,
  cart: initialCartState
};

const reducer = createReducer(
  initialEventsState,
  /**
   * Load Events Api Actions.
   */
  on(EventsActions.loadEvents, state => ({
    ...state,
    eventifyEvents: { ...state.eventifyEvents, loading: true }
  })),
  on(EventsActions.loadEventsSuccess, (state, { eventifyEvents }) => ({
    ...state,
    eventifyEvents: eventifyEventsAdapter.setMany(eventifyEvents, {
      ...state.eventifyEvents,
      loading: false
    })
  })),
  on(EventsActions.loadEventsSuccess, state => ({
    ...state,
    eventifyEvents: { ...state.eventifyEvents, loading: false }
  })),
  /**
   * Add Event To Cart Api Actions.
   */
  on(EventsActions.addEventToCart, (state, { event }) => ({
    ...state,
    cart: cartAdapter.addOne(event, {
      ...state.cart,
      adding: true
    }),
    eventifyEvents: eventifyEventsAdapter.removeOne(event._id, {
      ...state.eventifyEvents,
      adding: true
    })
  })),
  on(EventsActions.addEventToCartSuccess, state => ({
    ...state,
    eventifyEvents: { ...state.eventifyEvents, adding: false }
  })),
  on(EventsActions.addEventToCartFailure, state => ({
    ...state,
    eventifyEvents: { ...state.eventifyEvents, adding: false }
  })),
  /**
   * Remove Event From Cart Api Actions.
   */
  on(EventsActions.removeEventFromCart, (state, { event }) => ({
    ...state,
    eventifyEvents: eventifyEventsAdapter.addOne(event, {
      ...state.eventifyEvents,
      adding: true
    }),
    cart: cartAdapter.removeOne(event._id, {
      ...state.cart,
      adding: true
    })
  })),
  on(EventsActions.removeEventFromCartSuccess, state => ({
    ...state,
    cart: { ...state.cart, adding: false }
  })),
  on(EventsActions.removeEventFromCartFailure, state => ({
    ...state,
    cart: { ...state.cart, adding: false }
  }))
);

export const eventsReducer = (state: EventsState | undefined, action: Action) => reducer(state, action);
