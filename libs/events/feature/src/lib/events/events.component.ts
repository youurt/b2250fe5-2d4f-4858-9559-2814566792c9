import { AsyncPipe, DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  Pipe,
  PipeTransform,
  ViewEncapsulation,
  inject
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EventifyEvent } from '@eventify-org/common-api';
import { ToolbarComponent } from '@eventify-org/common-ui';
import { EventCardComponent } from '@eventify-org/events-ui';
import { EventsFacade } from '@eventify-org/events/data-access';
import { map } from 'rxjs';

/**
 * Checks if the event title contains the search term. This pipe is used in the template of date headers.
 *
 * @returns `true` if the event title contains the search term, `false` otherwise.
 */
@Pipe({
  name: 'eventifyOrgEventTitleCheckPipe',
  standalone: true
})
export class EventTitleCheckPipe implements PipeTransform {
  transform(events: [string, EventifyEvent[]], searchTerm: string): boolean {
    return events[1].some(event => {
      return event.title.toLowerCase().includes(searchTerm);
    });
  }
}

@Component({
  selector: 'eventify-org-events',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    JsonPipe,
    MatButtonModule,
    ToolbarComponent,
    EventCardComponent,
    DatePipe,
    EventTitleCheckPipe
  ],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent implements OnInit {
  private eventsFacade = inject(EventsFacade);

  @HostBinding('class.c-events') class = true;

  /**
   * The search term.
   */
  protected searchTerm = '';

  /**
   * The list of events.
   *
   * The grouping and sorting handling is done inside the pipe of the `events$` observable.
   */
  protected events$ = this.eventsFacade.$events.pipe(
    map(events =>
      Object.entries(
        events
          .filter(event => event.startTime !== undefined) // filter out undefined start times
          .reduce((acc, event) => {
            // group events by date
            const key = event.startTime.split('T')[0];

            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(event);

            return acc;
          }, <Record<string, EventifyEvent[]>>{})
      ).sort((a, b) => {
        // sort events by date
        return new Date(a[0]).getTime() - new Date(b[0]).getTime();
      })
    )
  );

  /**
   * The list of events in the cart.
   */
  protected cart$ = this.eventsFacade.$cart;

  ngOnInit(): void {
    this.eventsFacade.loadEvents(); // we need to load the store initially
  }

  /**
   * Handles the form value changes and sets the search term.
   *
   * @param searchTerm The `string` to search for.
   */
  protected onFormValueChanges(searchTerm: string) {
    this.searchTerm = searchTerm.toLowerCase();
  }

  /**
   * Handles adding an event to the cart.
   *
   * @param event The `EventifyEvent` to add to the cart.
   */
  onAddToCard(event: EventifyEvent) {
    this.eventsFacade.addEventToCart(event);
  }

  /**
   * Handles removing an event from the cart.
   *
   * @param event The `EventifyEvent` to remove from the cart.
   */
  onRemoveFromCart(event: EventifyEvent) {
    this.eventsFacade.removeEventFromCart(event);
  }
}
