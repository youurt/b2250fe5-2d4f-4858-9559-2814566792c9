import { ComponentHarness } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { MatToolbarHarness } from '@angular/material/toolbar/testing';

export class ToolbarComponentHarness extends ComponentHarness {
  static hostSelector = 'eventify-org-toolbar';

  /**
   * @returns The toolbar harness.
   */
  toolbar() {
    return this.locatorFor(MatToolbarHarness)();
  }

  /**
   * @returns The search input harness.
   */
  searchInput() {
    return this.locatorFor(MatInputHarness)();
  }

  /**
   * @returns The shopping cart menu harness.
   */
  shoppingCartMenu() {
    return this.locatorFor(MatMenuHarness)();
  }
}
