import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, within } from 'storybook/test';
import { SpinnerComponent } from './spinner.component';

const meta: Meta<SpinnerComponent> = {
  title: 'Example/Spinner',
  component: SpinnerComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['spinner', 'dots', 'bars', 'ring'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'white', 'accent', 'success'],
    },
  },
};

export default meta;
type Story = StoryObj<SpinnerComponent>;

// 1. Default Spinner
export const Default: Story = {
  args: {
    label: 'Loading...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Loading...');
    await expect(label).toBeInTheDocument();
  },
};

// 2. Dots Variant
export const DotsVariant: Story = {
  args: {
    type: 'dots',
    size: 'medium',
    color: 'primary',
    label: 'Saving changes...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const status = canvas.getByRole('status');
    await expect(status).toBeInTheDocument();
  },
};

// 3. Bars Variant
export const BarsVariant: Story = {
  args: {
    type: 'bars',
    size: 'large',
    color: 'accent',
    label: 'Uploading attachment...',
    subtext: '75% completed',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Uploading attachment...');
    await expect(label).toBeInTheDocument();
  },
};

// 4. Dual Ring Glow Variant
export const RingGlowVariant: Story = {
  args: {
    type: 'ring',
    size: 'large',
    color: 'primary',
    label: 'Authenticating...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Authenticating...');
    await expect(label).toBeInTheDocument();
  },
};

// 5. Sizes Showcase
export const SizesShowcase: Story = {
  args: {
    type: 'spinner',
    label: 'Processing API request',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-6 p-4">
        <div class="flex items-center gap-4">
          <span class="text-xs font-mono w-16 text-slate-400">small</span>
          <storybook-spinner size="small" [label]="label"></storybook-spinner>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-xs font-mono w-16 text-slate-400">medium</span>
          <storybook-spinner size="medium" [label]="label"></storybook-spinner>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-xs font-mono w-16 text-slate-400">large</span>
          <storybook-spinner size="large" [label]="label"></storybook-spinner>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-xs font-mono w-16 text-slate-400">xlarge</span>
          <storybook-spinner size="xlarge" [label]="label"></storybook-spinner>
        </div>
      </div>
    `,
  }),
};

// 6. Colors Showcase
export const ColorsShowcase: Story = {
  args: {
    type: 'dots',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center gap-8 p-6 bg-slate-900 rounded-2xl">
        <div class="text-center space-y-2">
          <storybook-spinner type="dots" color="primary" label="Primary"></storybook-spinner>
        </div>
        <div class="text-center space-y-2">
          <storybook-spinner type="dots" color="white" label="White"></storybook-spinner>
        </div>
        <div class="text-center space-y-2">
          <storybook-spinner type="dots" color="accent" label="Accent"></storybook-spinner>
        </div>
        <div class="text-center space-y-2">
          <storybook-spinner type="dots" color="success" label="Success"></storybook-spinner>
        </div>
      </div>
    `,
  }),
};
