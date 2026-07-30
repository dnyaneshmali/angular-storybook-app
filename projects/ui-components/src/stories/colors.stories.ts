import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ColorsComponent } from './colors.component';

const meta: Meta<ColorsComponent> = {
  title: 'Design System/Colors',
  component: ColorsComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interactive reference grid for all corporate design token colors. Click on variable name or hex value to copy to clipboard.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ColorsComponent>;

export const ColorPalette: Story = {};
