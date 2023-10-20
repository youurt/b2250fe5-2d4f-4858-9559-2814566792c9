import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createEvent } from '@eventify-org/common-api';
import { EventsFacade } from '@eventify-org/events/data-access';
import { BehaviorSubject } from 'rxjs';
import { EventsComponent } from './events.component';

const createEventsFacadeMock = () => ({
  events$: new BehaviorSubject([createEvent(), createEvent({ _id: '2' })]),
  cart$: new BehaviorSubject([createEvent({ _id: '3' }), createEvent({ _id: '4' })]),
  loadEvents: jest.fn(),
  onAddToCart: jest.fn(),
  onRemoveFromCart: jest.fn()
});

describe('EventsComponent', () => {
  let fixture: ComponentFixture<EventsComponent>;
  let eventsFacadeMock: ReturnType<typeof createEventsFacadeMock>;

  beforeEach(async () => {
    eventsFacadeMock = createEventsFacadeMock();

    await TestBed.configureTestingModule({
      imports: [EventsComponent, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [{ provide: EventsFacade, useValue: <Partial<EventsFacade>>eventsFacadeMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(EventsComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(eventsFacadeMock).toBeTruthy();
  });
});
