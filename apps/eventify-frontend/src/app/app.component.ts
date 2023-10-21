import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { EventifyEvent, ToolbarService } from '@eventify-org/common-api';
import { ToolbarComponent } from '@eventify-org/common-ui';
import { EventsFacade } from '@eventify-org/events/data-access';

@Component({
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, MatToolbarModule, NgIf, AsyncPipe],
  selector: 'eventify-org-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private toolbarService = inject(ToolbarService);
  private eventsFacade = inject(EventsFacade);

  /**
   * The list of events in the cart.
   */
  protected cart$ = this.eventsFacade.cart$;

  /**
   * Handles the form value changes and sets the search term.
   *
   * @param searchTerm The `string` to search for.
   */
  protected onFormValueChanges(searchTerm: string) {
    this.toolbarService.searchTerm$.next(searchTerm.toLowerCase());
  }

  /**
   * Handles removing an event from the cart.
   *
   * @param event The `EventifyEvent` to remove from the cart.
   */
  protected onRemoveFromCart(event: EventifyEvent) {
    this.eventsFacade.removeEventFromCart(event);
  }
}
