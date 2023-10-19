import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EventsFacade } from '@eventify-org/events/data-access';

@Component({
  selector: 'eventify-org-events',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, JsonPipe, MatButtonModule],
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
  protected events$ = this.eventsFacade.$events;

  ngOnInit(): void {
    this.eventsFacade.loadEvents(); // initial load
  }
}
