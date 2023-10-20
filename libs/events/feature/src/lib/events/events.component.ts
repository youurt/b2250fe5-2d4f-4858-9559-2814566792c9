import { AsyncPipe, DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EventifyEvent } from '@eventify-org/common-api';
import { ToolbarComponent } from '@eventify-org/common-ui';
import { EventCardComponent } from '@eventify-org/events-ui';
import { EventsFacade } from '@eventify-org/events/data-access';
import { map } from 'rxjs';

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
  ],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent implements OnInit {
  private eventsFacade = inject(EventsFacade);

  /**
   * The list of events.
   */
  protected events$ = this.eventsFacade.$events.pipe(
    map((events) => {
      const obj: Record<string, EventifyEvent[]> = {};

      const sanitizedEvents = events.filter(
        (event) => event.startTime !== undefined
      );

      const grouped = sanitizedEvents.reduce((acc, event) => {
        const key = event.startTime.split('T')[0];

        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(event);
        return acc;
      }, obj);

      const groupedArray = Object.entries(grouped);
      const sorted = groupedArray.sort((a, b) => {
        return new Date(a[0]).getTime() - new Date(b[0]).getTime();
      });

      return sorted;
    })
  );

  ngOnInit(): void {
    this.eventsFacade.loadEvents(); // initial load
  }

  onFormValueChanges(value: string) {
    console.log(value);
  }
}
