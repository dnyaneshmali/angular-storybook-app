import { Component, input, output, computed, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'storybook-card',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  title = input<string>();
  subtitle = input<string>();
  description = input<string>();
  imageUrl = input<string>();
  imageAlt = input<string>('Card image');
  badge = input<string>();
  variant = input<'elevated' | 'outlined' | 'flat'>('elevated');
  width = input<string>();
  height = input<string>();
  padding = input<'none' | 'small' | 'medium' | 'large'>('medium');
  primaryButtonLabel = input<string>();
  secondaryButtonLabel = input<string>();
  disabled = input<boolean>(false);
  loading = input<boolean>(false);

  primaryAction = output<Event>();
  secondaryAction = output<Event>();

  /** @ignore */
  protected readonly cardClasses = computed(() => {
    const common = 'rounded-2xl flex flex-col overflow-hidden transition-all duration-300 relative';

    const variantMap = {
      elevated: 'bg-white border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-0.5',
      outlined: 'bg-white border-2 border-brand-secondary-border shadow-none hover:border-slate-300',
      flat: 'bg-slate-50 border border-slate-100/60 shadow-none hover:bg-slate-100/80',
    };

    const variantClass = variantMap[this.variant()] || variantMap.elevated;
    const disabledClass = this.disabled() ? 'opacity-60 pointer-events-none' : '';

    return `${common} ${variantClass} ${disabledClass}`.trim();
  });

  /** @ignore */
  protected readonly contentPaddingClass = computed(() => {
    const paddingMap = {
      none: 'p-0',
      small: 'p-4',
      medium: 'p-6',
      large: 'p-8',
    };
    return paddingMap[this.padding()] || paddingMap.medium;
  });

  /** @ignore */
  protected readonly cardStyles = computed(() => {
    const styles: Record<string, string> = {};
    if (this.width()) {
      styles['width'] = this.width()!;
    }
    if (this.height()) {
      styles['height'] = this.height()!;
    }
    return styles;
  });

  /** @ignore */
  protected handlePrimaryClick(event: Event) {
    if (!this.disabled() && !this.loading()) {
      this.primaryAction.emit(event);
    }
  }

  /** @ignore */
  protected handleSecondaryClick(event: Event) {
    if (!this.disabled() && !this.loading()) {
      this.secondaryAction.emit(event);
    }
  }
}
