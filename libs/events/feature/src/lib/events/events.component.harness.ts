import { ComponentHarness } from '@angular/cdk/testing';
import { EventCardComponentHarness } from '@eventify-org/events-ui';
export class EventsComponentHarness extends ComponentHarness {
  static hostSelector = 'eventify-org-events';

  /**
   * @returns The `EventCardComponentHarness`es.
   */
  eventCards() {
    return this.locatorForAll(EventCardComponentHarness)();
  }
}
