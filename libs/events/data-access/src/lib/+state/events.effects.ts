import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as EventsActions from './events.actions';
import * as EventsFeature from './events.reducer';

@Injectable()
export class EventsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.initEvents),
      switchMap(() => of(EventsActions.loadEventsSuccess({ events: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(EventsActions.loadEventsFailure({ error }));
      })
    )
  );
}
