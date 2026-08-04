import type { Meta, StoryObj } from '@storybook/angular-vite';
import { fn, expect, userEvent, within } from 'storybook/test';

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Primary Button/i });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass('bg-brand-primary');
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Secondary Button/i });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass('border');
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Small Button/i });
    await expect(button).toHaveClass('px-3.5');
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    label: 'Medium Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Medium Button/i });
    await expect(button).toHaveClass('px-4.5');
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Large Button/i });
    await expect(button).toHaveClass('px-6');
  },
};

// State Stories
export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Button',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Disabled Button/i });
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    label: 'Loading Button',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Loading Button/i });
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

// Icon Stories
export const WithIcon: Story = {
  args: {
    icon: 'search',
    label: 'Search',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Search/i });
    await expect(button).toBeInTheDocument();
    const svg = button.querySelector('svg');
    await expect(svg).toBeTruthy();
  },
};

export const WithIconPrimary: Story = {
  args: {
    primary: true,
    icon: 'arrow-right',
    label: 'Get Started',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Get Started/i });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const IconAndLoading: Story = {
  args: {
    primary: true,
    icon: 'check',
    loading: true,
    label: 'Submitting',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Submitting/i });
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
