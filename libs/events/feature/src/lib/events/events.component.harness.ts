import { ComponentHarness } from '@angular/cdk/testing';
import { ToolbarComponentHarness } from '@eventify-org/common-ui';
import { EventCardComponentHarness } from '@eventify-org/events-ui';
export class EventsComponentHarness extends ComponentHarness {
  static hostSelector = 'eventify-org-events';

  /**
   * @returns The `ToolbarComponentHarness`.
   */
  toolbar() {
    return this.locatorFor(ToolbarComponentHarness)();
  }

  /**
   * @returns The `EventCardComponentHarness`es.
   */
  eventCards() {
    return this.locatorForAll(EventCardComponentHarness)();
  }
}
