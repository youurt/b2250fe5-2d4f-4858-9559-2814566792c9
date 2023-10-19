import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@ngrx/router-store/data-persistence';
import { map } from 'rxjs';
import { EventsHttpService } from '../services/events-http.service';
import * as EventsActions from './events.actions';

@Injectable()
export class EventsEffects {
  private actions$ = inject(Actions);
  private eventsHttpService = inject(EventsHttpService);

  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.loadEvents),
      fetch({
        run: () =>
          this.eventsHttpService
            .getEventifyEvents()
            .pipe(
              map((eventifyEvents) =>
                EventsActions.loadEventsSuccess({ eventifyEvents })
              )
            ),
        onError: () => EventsActions.loadEventsFailure(),
      })
    )
  );
}
