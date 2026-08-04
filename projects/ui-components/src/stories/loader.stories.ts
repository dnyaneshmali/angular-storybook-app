import type { Meta, StoryObj } from '@storybook/angular-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { LoaderComponent } from './loader.component';

const meta: Meta<LoaderComponent> = {
  title: 'Example/Loader',
  component: LoaderComponent,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['fullscreen', 'overlay', 'inline'],
    },
    theme: {
      control: 'select',
      options: ['glass', 'light', 'dark'],
    },
    spinnerType: {
      control: 'select',
      options: ['ring', 'spinner', 'dots', 'bars'],
    },
    spinnerColor: {
      control: 'select',
      options: ['primary', 'secondary', 'white', 'accent', 'success'],
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
  args: {
    cancelled: fn(),
  },
};

export default meta;
type Story = StoryObj<LoaderComponent>;

// 1. Default Active Loader
export const Default: Story = {
  args: {
    active: true,
    mode: 'overlay',
    title: 'Processing API Request',
    subtitle: 'Please wait while we sync your dataset with the cloud server.',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="relative w-full h-[320px] bg-slate-900 rounded-2xl overflow-hidden">
        <storybook-loader
          [active]="active"
          [mode]="mode"
          [title]="title"
          [subtitle]="subtitle"
        ></storybook-loader>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Processing API Request');
    await expect(title).toBeInTheDocument();
  },
};

// 2. With Progress Bar
export const WithProgress: Story = {
  args: {
    active: true,
    mode: 'overlay',
    title: 'Uploading Media Files',
    subtitle: 'Transferring assets to storage bucket. Do not close this browser tab.',
    progress: 72,
    spinnerType: 'ring',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="relative w-full h-[350px] bg-slate-900 rounded-2xl overflow-hidden">
        <storybook-loader
          [active]="active"
          [mode]="mode"
          [title]="title"
          [subtitle]="subtitle"
          [progress]="progress"
          [spinnerType]="spinnerType"
        ></storybook-loader>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progressText = canvas.getByText('72%');
    await expect(progressText).toBeInTheDocument();
  },
};

// 3. Dark Theme
export const DarkTheme: Story = {
  args: {
    active: true,
    mode: 'overlay',
    theme: 'dark',
    title: 'Executing Migration Script',
    subtitle: 'Updating database schemas and indexing records...',
    spinnerType: 'dots',
    spinnerColor: 'accent',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="relative w-full h-[320px] bg-slate-950 rounded-2xl overflow-hidden">
        <storybook-loader
          [active]="active"
          [mode]="mode"
          [theme]="theme"
          [title]="title"
          [subtitle]="subtitle"
          [spinnerType]="spinnerType"
          [spinnerColor]="spinnerColor"
        ></storybook-loader>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Executing Migration Script');
    await expect(title).toBeInTheDocument();
  },
};

// 4. Glass Theme
export const GlassTheme: Story = {
  args: {
    active: true,
    mode: 'overlay',
    theme: 'glass',
    title: 'Connecting to Payment Gateway',
    subtitle: 'Securing transaction payload...',
    spinnerType: 'ring',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="relative w-full h-[320px] bg-gradient-to-r from-blue-600 to-indigo-900 rounded-2xl overflow-hidden">
        <storybook-loader
          [active]="active"
          [mode]="mode"
          [theme]="theme"
          [title]="title"
          [subtitle]="subtitle"
          [spinnerType]="spinnerType"
        ></storybook-loader>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Connecting to Payment Gateway');
    await expect(title).toBeInTheDocument();
  },
};

// 5. Light Theme
export const LightTheme: Story = {
  args: {
    active: true,
    mode: 'overlay',
    theme: 'light',
    title: 'Synchronizing Database',
    subtitle: 'Refreshing local cache data...',
    spinnerType: 'spinner',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="relative w-full h-[320px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
        <storybook-loader
          [active]="active"
          [mode]="mode"
          [theme]="theme"
          [title]="title"
          [subtitle]="subtitle"
          [spinnerType]="spinnerType"
        ></storybook-loader>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Synchronizing Database');
    await expect(title).toBeInTheDocument();
  },
};

// 6. Cancelable Request
export const Cancelable: Story = {
  args: {
    active: true,
    mode: 'overlay',
    cancelable: true,
    cancelButtonLabel: 'Abort Request',
    title: 'Long-running Export Task',
    subtitle: 'Generating PDF report with analytics charts...',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="relative w-full h-[350px] bg-slate-900 rounded-2xl overflow-hidden">
        <storybook-loader
          [active]="active"
          [mode]="mode"
          [cancelable]="cancelable"
          [cancelButtonLabel]="cancelButtonLabel"
          [title]="title"
          [subtitle]="subtitle"
          (cancelled)="cancelled($event)"
        ></storybook-loader>
      </div>
    `,
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const cancelBtn = canvas.getByRole('button', { name: /Abort Request/i });
    await expect(cancelBtn).toBeInTheDocument();

    await userEvent.click(cancelBtn);
    await expect(args.cancelled).toHaveBeenCalled();
  },
};

// 7. Bouncing Dots Spinner
export const DotsSpinner: Story = {
  args: {
    active: true,
    mode: 'overlay',
    spinnerType: 'dots',
    title: 'Saving Changes',
    subtitle: 'Synchronizing user profile details...',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="relative w-full h-[320px] bg-slate-900 rounded-2xl overflow-hidden">
        <storybook-loader
          [active]="active"
          [mode]="mode"
          [spinnerType]="spinnerType"
          [title]="title"
          [subtitle]="subtitle"
        ></storybook-loader>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Saving Changes');
    await expect(title).toBeInTheDocument();
  },
};

// 8. Interaction Blocked Demonstration
export const InteractionBlocked: Story = {
  args: {
    active: true,
    mode: 'overlay',
    title: 'API Request in Progress',
    subtitle: 'Notice how background elements are blocked while active.',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="relative p-8 bg-slate-100 rounded-3xl min-h-[350px] space-y-4 overflow-hidden">
        <h3 class="text-xl font-bold text-slate-800">Background Form Page</h3>
        <p class="text-sm text-slate-600">Simulated page behind the loader backdrop.</p>
        <div class="flex gap-3">
          <button id="bg-btn-1" class="px-4 py-2 bg-brand-primary text-white rounded-lg">Background Action</button>
          <input type="text" placeholder="Form input..." class="p-2 border rounded-lg bg-white" />
        </div>
        <storybook-loader
          [active]="active"
          [mode]="mode"
          [title]="title"
          [subtitle]="subtitle"
        ></storybook-loader>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('API Request in Progress');
    await expect(title).toBeInTheDocument();
  },
};
