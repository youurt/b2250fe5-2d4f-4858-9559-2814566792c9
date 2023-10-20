import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventCardComponent } from './event-card.component';
import { EventCardComponentHarness } from './event-card.component.harness';

describe('EventCardComponent', () => {
  let component: EventCardComponent;
  let fixture: ComponentFixture<EventCardComponent>;
  let harness: EventCardComponentHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EventCardComponent);
    component = fixture.componentInstance;
    component.title = 'Test Event';
    component.startingDate = '2021-01-01';
    component.endingDate = '2021-01-02';
    // @TODO: Add some creator file for this:
    component.location = {
      id: '1',
      name: 'Test Location',
      contentUrl: 'Test url',
      live: true,
      direction: 'Test direction'
    };
    component.imagePath = 'Test image path';

    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, EventCardComponentHarness);
    fixture.detectChanges();
  });

  it('should create a card', async () => {
    await harness.card().then(card => {
      card.getTitleText().then(title => expect(title).toBe('Test Event'));
    });
  });

  it('should have an add to cart button which emits the addToCart output', async () => {
    const spy = jest.spyOn(component.addToCart, 'emit');
    expect(spy).not.toHaveBeenCalled();

    const addToCartButton = await harness.addButton();
    await addToCartButton.click();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should have a locations href', async () => {
    await harness.locationButtonHref().then(href => expect(href).toBe('Test direction'));
  });
});
