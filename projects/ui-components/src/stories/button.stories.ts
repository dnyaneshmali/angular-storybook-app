import type { Meta, StoryObj } from '@storybook/angular-vite';
import { fn } from 'storybook/test';

import { ButtonComponent } from './button.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonComponent> = {
  title: 'Example/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
    icon: {
      control: 'select',
      options: ['search', 'check', 'arrow-right', 'download', 'plus', ''],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// Basic Stories
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    label: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large Button',
  },
};

// State Stories
export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    label: 'Loading Button',
  },
};

// Icon Stories
export const WithIcon: Story = {
  args: {
    icon: 'search',
    label: 'Search',
  },
};

export const WithIconPrimary: Story = {
  args: {
    primary: true,
    icon: 'arrow-right',
    label: 'Get Started',
  },
};

export const IconAndLoading: Story = {
  args: {
    primary: true,
    icon: 'check',
    loading: true,
    label: 'Submitting',
  },
};
