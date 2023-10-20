import { TestBed } from '@angular/core/testing';
import { createEvent } from '@eventify-org/common-api';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { EventsHttpService } from '../services/events-http.service';
import * as EventsActions from './events.actions';
import { EventsEffects } from './events.effects';

describe('EventsEffects', () => {
  let actions: Observable<Action>;
  let effects: EventsEffects;
  let service: EventsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        EventsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: EventsHttpService,
          useValue: <Partial<EventsHttpService>>{
            getEventifyEvents: jest.fn()
          }
        }
      ]
    });

    effects = TestBed.inject(EventsEffects);
    service = TestBed.inject(EventsHttpService);
  });

  describe('loadEvents$', () => {
    it('success', () => {
      const eventifyEvents = [createEvent(), createEvent({ title: 'test' })];

      jest.spyOn(service, 'getEventifyEvents').mockReturnValue(of(eventifyEvents));

      actions = hot('-a-|', { a: EventsActions.loadEvents() });

      const expected = hot('-a-|', {
        a: EventsActions.loadEventsSuccess({ eventifyEvents })
      });

      expect(effects.loadEvents$).toBeObservable(expected);
      expect(service.getEventifyEvents).toHaveBeenCalled();
    });
  });
});
