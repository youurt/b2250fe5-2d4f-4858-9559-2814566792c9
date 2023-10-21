import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createEvent } from '@eventify-org/common-api';
import { EventsFacade } from '@eventify-org/events/data-access';
import { BehaviorSubject } from 'rxjs';
import { EventsComponent } from './events.component';
import { EventsComponentHarness } from './events.component.harness';

describe('EventsComponent', () => {
  const createEventsFacadeMock = () => ({
    events$: new BehaviorSubject([
      createEvent({ title: 'foo', date: '2022-01-02T00:00:00.000' }),
      createEvent({ _id: '2', date: '2022-02-04T00:00:00.000' }),
      createEvent({ _id: '2', date: '2022-02-04T00:00:00.000' })
    ]),
    eventsLoading$: new BehaviorSubject(false),
    loadEvents: jest.fn()
  });

  let fixture: ComponentFixture<EventsComponent>;
  let eventsFacadeMock: ReturnType<typeof createEventsFacadeMock>;
  let harness: EventsComponentHarness;

  beforeEach(async () => {
    eventsFacadeMock = createEventsFacadeMock();

    await TestBed.configureTestingModule({
      imports: [EventsComponent, HttpClientTestingModule, NoopAnimationsModule],
      providers: [{ provide: EventsFacade, useValue: <Partial<EventsFacade>>eventsFacadeMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(EventsComponent);

    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, EventsComponentHarness);
    fixture.detectChanges();
  });

  it('should have 3 events in the view', async () => {
    const events = await harness.eventCards();
    expect(events.length).toBe(3);
  });
});
