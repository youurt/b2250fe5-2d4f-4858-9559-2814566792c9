import { EventsEntity } from './events.models';
import {
  eventsAdapter,
  EventsPartialState,
  initialEventsState,
} from './events.reducer';
import * as EventsSelectors from './events.selectors';

describe('Events Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEventsId = (it: EventsEntity) => it.id;
  const createEventsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as EventsEntity);

  let state: EventsPartialState;

  beforeEach(() => {
    state = {
      events: eventsAdapter.setAll(
        [
          createEventsEntity('PRODUCT-AAA'),
          createEventsEntity('PRODUCT-BBB'),
          createEventsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialEventsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Events Selectors', () => {
    it('selectAllEvents() should return the list of Events', () => {
      const results = EventsSelectors.selectAllEvents(state);
      const selId = getEventsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = EventsSelectors.selectEntity(state) as EventsEntity;
      const selId = getEventsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEventsLoaded() should return the current "loaded" status', () => {
      const result = EventsSelectors.selectEventsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectEventsError() should return the current "error" state', () => {
      const result = EventsSelectors.selectEventsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
