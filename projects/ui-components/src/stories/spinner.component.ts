import { Component, input, computed, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'storybook-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SpinnerComponent {
  type = input<'spinner' | 'dots' | 'bars' | 'ring'>('spinner');
  size = input<'small' | 'medium' | 'large' | 'xlarge'>('medium');
  color = input<'primary' | 'secondary' | 'white' | 'accent' | 'success'>('primary');
  label = input<string>();
  subtext = input<string>();

  /** @ignore */
  protected readonly colorClass = computed(() => {
    const colorMap = {
      primary: 'text-brand-primary',
      secondary: 'text-brand-secondary',
      white: 'text-white',
      accent: 'text-brand-accent',
      success: 'text-emerald-500',
    };
    return colorMap[this.color()] || colorMap.primary;
  });

  /** @ignore */
  protected readonly sizeClass = computed(() => {
    const sizeMap = {
      small: 'w-4 h-4 text-xs',
      medium: 'w-6 h-6 text-sm',
      large: 'w-10 h-10 text-base',
      xlarge: 'w-16 h-16 text-lg',
    };
    return sizeMap[this.size()] || sizeMap.medium;
  });

  /** @ignore */
  protected readonly dotSizeClass = computed(() => {
    const dotMap = {
      small: 'w-1.5 h-1.5',
      medium: 'w-2.5 h-2.5',
      large: 'w-3.5 h-3.5',
      xlarge: 'w-5 h-5',
    };
    return dotMap[this.size()] || dotMap.medium;
  });

  /** @ignore */
  protected readonly barSizeClass = computed(() => {
    const barMap = {
      small: 'h-4 w-1',
      medium: 'h-6 w-1.5',
      large: 'h-10 w-2',
      xlarge: 'h-14 w-2.5',
    };
    return barMap[this.size()] || barMap.medium;
  });
}
