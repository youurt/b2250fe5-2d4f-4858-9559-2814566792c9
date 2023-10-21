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
    cart$: new BehaviorSubject([createEvent({ _id: '3' }), createEvent({ _id: '4' })]),
    eventsLoading$: new BehaviorSubject(false),
    loadEvents: jest.fn(),
    onAddToCart: jest.fn(),
    onRemoveFromCart: jest.fn(),
    removeEventFromCart: jest.fn()
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

  it('should filter events from view', async () => {
    const toolbar = await harness.toolbar();
    const input = await toolbar.searchInput();
    await input.setValue('foo'); // let's filter foo
    await input.blur();

    expect(await harness.eventCards()).toHaveLength(1);
  });

  it('should have 2 events in the cart', async () => {
    const toolbar = await harness.toolbar();
    const badge = await toolbar.badge();

    expect(await badge?.getText()).toBe('2');
  });

  it('should should remove events from the cart', async () => {
    const toolbar = await harness.toolbar();
    const badge = await toolbar.badge();

    expect(await badge?.getText()).toBe('2');

    const menu = await toolbar.shoppingCartMenu();
    await menu.open();

    const menuItems = await menu.getItems();
    await menuItems[0].click();

    expect(await badge?.getText()).toBe('1');
  });
});
