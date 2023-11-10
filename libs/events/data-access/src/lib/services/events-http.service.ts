import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EventifyEvent } from '@eventify-org/common-api';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventsHttpService {
  private apiUrl = 'https://teclead-ventures.github.io/data/london-events.json';
  private httpClient = inject(HttpClient);

  /**
   * @returns An `Observable<EventifyEvent[]>`.
   */
  getEventifyEvents(): Observable<EventifyEvent[]> {
    return this.httpClient.get<EventifyEvent[]>(this.apiUrl).pipe(
      map(eventifyEvents =>
        eventifyEvents.map(eventifyEvent => ({
          ...eventifyEvent,
          venue: {
            ...eventifyEvent.venue,
            direction: eventifyEvent.venue.direction.replace('/Colour+Factory+london', eventifyEvent.venue.name)
          }
        }))
      )
    );
  }
}
