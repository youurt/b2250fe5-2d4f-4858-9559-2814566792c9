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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventifyEvent, ToolbarService } from '@eventify-org/common-api';
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
  transform(groupedEvents: [string, EventifyEvent[]], searchTerm: string | null): boolean {
    if (searchTerm === null) {
      return true;
    }

    return groupedEvents[1].some(event => event.title.toLowerCase().includes(searchTerm));
  }
}

/**
 * Checks if the event title contains the search term. This pipe is used in the template of event cards.
 *
 * @returns `true` if the event title contains the search term, `false` otherwise.
 */
@Pipe({
  name: 'eventifyOrgEventCardCheckPipe',
  standalone: true
})
export class EventCardCheckPipe implements PipeTransform {
  transform(title: string, searchTerm: string | null): boolean {
    if (searchTerm === null) {
      return true;
    }

    return title.toLowerCase().includes(searchTerm);
  }
}
/**
 * CHecks if there are no events found.
 */
@Pipe({
  name: 'eventifyOrgNoEventFoundCheckPipe',
  standalone: true
})
export class NoEventFoundCheckPipe implements PipeTransform {
  transform(groupedEvents: [string, EventifyEvent[]][] | null, searchTerm: string | null): boolean {
    if (searchTerm === null) {
      return false;
    }

    // if there are no events, return false
    if (groupedEvents === null) {
      return false;
    }

    // unpack the grouped events and check if there are no events found
    return !groupedEvents.every(([_, events]) =>
      events.every(event => !event.title.toLowerCase().includes(searchTerm))
    );
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
    EventCardComponent,
    DatePipe,
    EventTitleCheckPipe,
    EventCardCheckPipe,
    MatProgressSpinnerModule,
    NoEventFoundCheckPipe
  ],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent implements OnInit {
  @HostBinding('class.c-events') class = true;

  private eventsFacade = inject(EventsFacade);
  private toolbarService = inject(ToolbarService);

  /**
   * The search term.
   */
  protected searchTerm$ = this.toolbarService.searchTerm$;

  /**
   * The list of events.
   *
   * The grouping and sorting handling is done inside the pipe of the `events$` observable.
   */
  protected events$ = this.eventsFacade.events$.pipe(
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
      ).sort(
        (a, b) =>
          // sort events by date
          new Date(a[0]).getTime() - new Date(b[0]).getTime()
      )
    )
  );

  /**
   * The loading state of the events.
   */
  protected eventsLoading$ = this.eventsFacade.eventsLoading$;

  ngOnInit(): void {
    this.eventsFacade.loadEvents(); // we need to load the store initially
  }

  /**
   * Handles adding an event to the cart.
   *
   * @param event The `EventifyEvent` to add to the cart.
   */
  protected onAddToCart(event: EventifyEvent) {
    this.eventsFacade.addEventToCart(event);
  }
}
