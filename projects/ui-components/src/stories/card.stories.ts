import type { Meta, StoryObj } from '@storybook/angular-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Example/Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'flat'],
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
    },
    width: { control: 'text' },
    height: { control: 'text' },
  },
  args: {
    primaryAction: fn(),
    secondaryAction: fn(),
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

// 1. Default Story (Minimal Card)
export const Default: Story = {
  args: {
    title: 'Standard Card Title',
    subtitle: 'Overview',
    description: 'This is a standard card component designed with Tailwind CSS, supporting clean typography and flexible layouts.',
    width: '360px',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByText('Standard Card Title');
    await expect(heading).toBeInTheDocument();
  },
};

// 2. With Buttons
export const WithButtons: Story = {
  args: {
    title: 'Interactive Project Card',
    subtitle: 'Workspace',
    description: 'Manage project configurations, component libraries, and Storybook documentation effortlessly.',
    primaryButtonLabel: 'Get Started',
    secondaryButtonLabel: 'View Details',
    width: '380px',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const primaryBtn = canvas.getByRole('button', { name: /Get Started/i });
    const secondaryBtn = canvas.getByRole('button', { name: /View Details/i });

    await expect(primaryBtn).toBeInTheDocument();
    await expect(secondaryBtn).toBeInTheDocument();

    await userEvent.click(primaryBtn);
    await expect(args.primaryAction).toHaveBeenCalled();

    await userEvent.click(secondaryBtn);
    await expect(args.secondaryAction).toHaveBeenCalled();
  },
};

// 3. Without Buttons
export const WithoutButtons: Story = {
  args: {
    title: 'Information Card',
    subtitle: 'Read Only',
    description: 'This card contains purely informational content without any action buttons.',
    width: '350px',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.queryAllByRole('button');
    await expect(buttons.length).toBe(0);
  },
};

// 4. Custom Width & Height
export const CustomWidthHeight: Story = {
  args: {
    title: 'Custom Dimension Card',
    subtitle: 'Fixed Size',
    description: 'Configured with an explicit width of 420px and height of 350px.',
    width: '420px',
    height: '350px',
    primaryButtonLabel: 'Confirm',
    secondaryButtonLabel: 'Cancel',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByText('Custom Dimension Card');
    await expect(heading).toBeInTheDocument();
  },
};

// 5. With Header Image & Badge
export const WithHeaderImage: Story = {
  args: {
    title: 'Design System Showcase',
    subtitle: 'UI Kit',
    description: 'Explore curated component libraries with custom themes, storybook integration, and unit tests.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Abstract design pattern',
    badge: 'Featured',
    primaryButtonLabel: 'Explore',
    secondaryButtonLabel: 'Docs',
    width: '380px',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('Featured');
    await expect(badge).toBeInTheDocument();

    const img = canvas.getByRole('img');
    await expect(img).toBeInTheDocument();
  },
};

// 6. Outlined Variant
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    title: 'Outlined Card Style',
    subtitle: 'Bordered',
    description: 'Features a distinct border style with clean background integration.',
    primaryButtonLabel: 'Select Plan',
    width: '360px',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Outlined Card Style');
    await expect(title).toBeInTheDocument();
  },
};

// 7. Flat Variant
export const Flat: Story = {
  args: {
    variant: 'flat',
    title: 'Flat Card Style',
    subtitle: 'Minimal',
    description: 'Subtle background container with zero drop shadow for minimalist interfaces.',
    primaryButtonLabel: 'Action',
    width: '360px',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Flat Card Style');
    await expect(title).toBeInTheDocument();
  },
};

// 8. With Badge (No Image)
export const WithBadge: Story = {
  args: {
    title: 'Pro Feature Unlocked',
    subtitle: 'Subscription',
    description: 'Access advanced analytics, export tools, and priority team support.',
    badge: 'PRO',
    primaryButtonLabel: 'Upgrade Now',
    width: '360px',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('PRO');
    await expect(badge).toBeInTheDocument();
  },
};

// 9. Loading State
export const LoadingState: Story = {
  args: {
    loading: true,
    width: '360px',
    height: '320px',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.queryByText('Standard Card Title');
    await expect(title).toBeNull();
  },
};
