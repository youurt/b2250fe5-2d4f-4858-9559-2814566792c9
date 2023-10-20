import { AsyncPipe, DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Pipe,
  PipeTransform,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EventifyEvent } from '@eventify-org/common-api';
import { ToolbarComponent } from '@eventify-org/common-ui';
import { EventCardComponent } from '@eventify-org/events-ui';
import { EventsFacade } from '@eventify-org/events/data-access';
import { map } from 'rxjs';

@Pipe({
  name: 'eventifyOrgEventTitleCheckPipe',
  standalone: true,
})
export class EventTitleCheckPipe implements PipeTransform {
  transform(events: [string, EventifyEvent[]], searchTerm: string): boolean {
    return events[1].some((event) => {
      return event.title.toLowerCase().startsWith(searchTerm);
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
    EventTitleCheckPipe,
  ],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent implements OnInit {
  private eventsFacade = inject(EventsFacade);

  searchTerm = '';

  /**
   * The list of events.
   */
  protected events$ = this.eventsFacade.$events.pipe(
    map((events) =>
      Object.entries(
        events
          .filter((event) => event.startTime !== undefined)
          .reduce((acc, event) => {
            const key = event.startTime.split('T')[0];

            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(event);

            return acc;
          }, <Record<string, EventifyEvent[]>>{})
      ).sort((a, b) => {
        return new Date(a[0]).getTime() - new Date(b[0]).getTime();
      })
    )
  );

  ngOnInit(): void {
    this.eventsFacade.loadEvents(); // initial load
  }

  onFormValueChanges(searchTerm: string) {
    console.log(searchTerm);
    this.searchTerm = searchTerm.toLowerCase();
  }
}
