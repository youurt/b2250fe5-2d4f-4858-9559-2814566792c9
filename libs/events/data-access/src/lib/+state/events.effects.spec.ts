import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as EventsActions from './events.actions';
import { EventsEffects } from './events.effects';

describe('EventsEffects', () => {
  let actions: Observable<Action>;
  let effects: EventsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        EventsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(EventsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: EventsActions.initEvents() });

      const expected = hot('-a-|', {
        a: EventsActions.loadEventsSuccess({ events: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
