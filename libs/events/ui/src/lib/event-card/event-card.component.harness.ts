import { ComponentHarness } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCardHarness } from '@angular/material/card/testing';

export class EventCardComponentHarness extends ComponentHarness {
  static hostSelector = 'eventify-org-event-card';

  /**
   * @returns The card harness.
   */
  card() {
    return this.locatorFor(MatCardHarness)();
  }

  /**
   * @returns The add to cart button harness.
   */
  addButton() {
    return this.locatorFor(
      MatButtonHarness.with({
        selector: '[data-role="add-to-cart"]'
      })
    )();
  }

  /**
   * @returns The location button href.
   */
  locationButtonHref() {
    return this.locatorFor('[data-role="location-button"]')().then(button => button.getAttribute('href'));
  }
}
