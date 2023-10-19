import type { Meta, StoryObj } from '@storybook/angular';
import { ProjectCardComponent } from './project-card.component';

const meta: Meta<ProjectCardComponent> = {
  component: ProjectCardComponent,
  title: 'ProjectCardComponent',
};
export default meta;
type Story = StoryObj<ProjectCardComponent>;

export const Primary: Story = {
  args: {},
};
