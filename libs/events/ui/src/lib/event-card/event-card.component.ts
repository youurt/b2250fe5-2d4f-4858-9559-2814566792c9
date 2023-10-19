import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'eventify-org-event-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, DatePipe],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCardComponent {
  @HostBinding('class.c-eventify-org-event-card') class = true;

  /**
   * The title of the event.
   */
  @Input({ required: true }) title!: string;

  /**
   * The image path of the event.
   */
  @Input({ required: true }) imagePath!: string;

  /**
   * The location of the event.
   */
  @Input({ required: true }) location!: string;

  /**
   * The starting date of the event.
   */
  @Input({ required: true }) startingDate!: string;

  /**
   * The ending date of the event.
   */
  @Input({ required: true }) endingDate!: string;
}
