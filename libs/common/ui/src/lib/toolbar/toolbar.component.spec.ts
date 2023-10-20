import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createEvent } from '@eventify-org/common-api';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarComponentHarness } from './toolbar.component.harness';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let harness: ToolbarComponentHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;

    component.cart = [createEvent(), createEvent({ _id: '1' })];

    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, ToolbarComponentHarness);
    fixture.detectChanges();
  });

  it('should render a toolbar', async () => {
    expect(await harness.toolbar()).toBeTruthy();
  });

  it('should have an input', async () => {
    const input = await harness.searchInput();
    const spy = jest.spyOn(component.formValueChanges, 'emit');

    await input.setValue('test');
    await input.blur();

    expect(await input.getValue()).toBe('test');
    expect(spy).toHaveBeenCalledWith('test');
  });

  it('should have a cart menu', async () => {
    const menu = await harness.shoppingCartMenu();
    await menu.open();
    const [firstItem, secondItem] = await menu.getItems();

    const spyFirstItemRemoval = jest.spyOn(component.removeFromCart, 'emit');
    await firstItem.click();
    expect(spyFirstItemRemoval).toHaveBeenCalledWith(createEvent());
    expect(component.cart?.length).toBe(1);

    const spySecondItemRemoval = jest.spyOn(component.removeFromCart, 'emit');
    await secondItem.click();
    expect(spySecondItemRemoval).toHaveBeenCalledWith(createEvent({ _id: '1' }));
    expect(component.cart?.length).toBe(0);
  });
});
