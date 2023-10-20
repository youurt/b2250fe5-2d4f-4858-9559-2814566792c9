import { Injectable, inject } from '@angular/core';
import { EventifyEvent } from '@eventify-org/common-api';
import { Store, select } from '@ngrx/store';
import * as EventsActions from './events.actions';
import * as EventsSelectors from './events.selectors';

@Injectable({ providedIn: 'root' })
export class EventsFacade {
  private readonly store = inject(Store);

  /**
   * Returns the list of events.
   */
  $events = this.store.pipe(select(EventsSelectors.getEvents));

  $cart = this.store.pipe(select(EventsSelectors.getCart));

  /**
   * Loads the events in the store.
   */
  loadEvents() {
    this.store.dispatch(EventsActions.loadEvents());
  }

  addEventToCart(event: EventifyEvent) {
    this.store.dispatch(EventsActions.addEventToCart({ event }));
  }
}
