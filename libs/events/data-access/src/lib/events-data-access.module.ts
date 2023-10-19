import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EventsEffects } from './+state/events.effects';
import * as fromEvents from './+state/events.reducer';

@NgModule({
  imports: [
    EffectsModule.forFeature([EventsEffects]),
    StoreModule.forFeature(
      fromEvents.EVENTS_FEATURE_KEY,
      fromEvents.eventsReducer
    ),
  ],
})
export class EventsDataAccessModule {}
