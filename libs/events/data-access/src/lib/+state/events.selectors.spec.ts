import {
  EventsPartialState,
  cartAdapter,
  eventifyEventsAdapter,
  initialCartState,
  initialEventifyEventsState
} from './events.reducer';

describe('Events Selectors', () => {
  let state: EventsPartialState;

  beforeEach(() => {
    state = {
      events: {
        eventifyEvents: eventifyEventsAdapter.setAll([], {
          ...initialEventifyEventsState
        }),
        cart: cartAdapter.setAll([], {
          ...initialCartState
        })
      }
    };
  });

  describe('Eventify Events Selectors', () => {
    it('should init', () => {
      expect(state).toBeTruthy();
      // @TODO: Add tests for selectors
    });
  });
});
