import { createEvent } from '@eventify-org/common-api';
import * as EventsActions from './events.actions';
import { EventsState, eventsReducer, initialEventsState } from './events.reducer';

describe('Events Reducer', () => {
  describe('Load Events actions', () => {
    const eventifyEvents = () => {
      const action = EventsActions.loadEvents();
      return eventsReducer(initialEventsState, action);
    };

    it('loadEvents should set loading state', () => {
      expect(initialEventsState.eventifyEvents.loading).toBe(false);

      const result = eventifyEvents();

      expect(result.eventifyEvents.loading).toBe(true);
    });

    it('loadEventsSuccess should reset loading state and add events in store', () => {
      const loadEventsResult: EventsState = eventifyEvents();

      expect(loadEventsResult.eventifyEvents.loading).toBe(true);
      expect(loadEventsResult.eventifyEvents.ids.length).toBe(0);

      const firstEvent = createEvent();
      const secondEvent = createEvent({ _id: '2' });
      const action = EventsActions.loadEventsSuccess({
        eventifyEvents: [firstEvent, secondEvent]
      });
      const result = eventsReducer(initialEventsState, action);

      expect(result.eventifyEvents.loading).toBe(false);
      expect(result.eventifyEvents.entities).toStrictEqual({
        [firstEvent._id]: firstEvent,
        [secondEvent._id]: secondEvent
      });
    });

    // @TODO: Add more tests in the future!
  });
});
