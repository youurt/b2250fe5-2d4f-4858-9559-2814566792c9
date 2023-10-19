import { Action } from '@ngrx/store';

import * as EventsActions from './events.actions';
import { EventsEntity } from './events.models';
import {
  EventsState,
  initialEventsState,
  eventsReducer,
} from './events.reducer';

describe('Events Reducer', () => {
  const createEventsEntity = (id: string, name = ''): EventsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Events actions', () => {
    it('loadEventsSuccess should return the list of known Events', () => {
      const events = [
        createEventsEntity('PRODUCT-AAA'),
        createEventsEntity('PRODUCT-zzz'),
      ];
      const action = EventsActions.loadEventsSuccess({ events });

      const result: EventsState = eventsReducer(initialEventsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = eventsReducer(initialEventsState, action);

      expect(result).toBe(initialEventsState);
    });
  });
});
