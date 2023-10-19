import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventsComponent } from '@eventify-org/events';

@Component({
  standalone: true,
  imports: [RouterModule, EventsComponent],
  selector: 'eventify-org-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
