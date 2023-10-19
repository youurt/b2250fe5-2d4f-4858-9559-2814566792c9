import type { Meta, StoryObj } from '@storybook/angular';
import { EventCardComponent } from './event-card.component';

const meta: Meta<EventCardComponent> = {
  component: EventCardComponent,
  title: 'EventCardComponent',
};
export default meta;
type Story = StoryObj<EventCardComponent>;

export const Primary: Story = {
  args: {
    title: 'some title',
    imagePath: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    location: 'some location',
    startingDate: '01/01/2021',
    endingDate: '01/02/2021',
  },
};
