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

  /**
   * Returns the list of events in the cart.
   */
  $cart = this.store.pipe(select(EventsSelectors.getCart));

  /**
   * Loads the events in the store.
   */
  loadEvents() {
    this.store.dispatch(EventsActions.loadEvents());
  }

  /**
   * Adds an event to the cart.
   *
   * @param event The event to add to the cart.
   */
  addEventToCart(event: EventifyEvent) {
    this.store.dispatch(EventsActions.addEventToCart({ event }));
  }

  /**
   * Removes an event from the cart.
   *
   * @param event The event to remove from the cart.
   */
  removeEventFromCart(event: EventifyEvent) {
    this.store.dispatch(EventsActions.removeEventFromCart({ event }));
  }
}
