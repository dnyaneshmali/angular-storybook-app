import { Component, input, output, computed, ViewEncapsulation, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'storybook-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  private readonly sanitizer = inject(DomSanitizer);

  primary = input<boolean>(false);
  backgroundColor = input<string>();
  size = input<'small' | 'medium' | 'large'>('medium');
  label = input<string>('Button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  icon = input<string>(); // e.g. 'search', 'check', 'arrow-right', 'download', 'plus'

  onClick = output<Event>();

  /** @ignore */
  protected readonly buttonClasses = computed(() => {
    const common = 'inline-flex items-center justify-center gap-2 cursor-pointer font-sans font-semibold rounded-lg transition-all duration-200 active:scale-97 outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none';
    
    const sizeMap = {
      small: 'px-3.5 py-2 text-xs',
      medium: 'px-4.5 py-2.5 text-sm',
      large: 'px-6 py-3 text-base'
    };
    const sizeClass = sizeMap[this.size()];

    const modeClass = this.primary()
      ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/25 hover:bg-brand-primary-hover hover:shadow-lg'
      : 'border border-brand-secondary-border bg-white text-brand-secondary shadow-sm hover:bg-slate-50 hover:border-slate-300';

    return `${common} ${sizeClass} ${modeClass}`;
  });

  /** @ignore */
  protected readonly svgIcon = computed<SafeHtml | string>(() => {
    const name = this.icon();
    if (!name) return '';
    const icons: Record<string, string> = {
      'search': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
      'check': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
      'arrow-right': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
      'download': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
      'plus': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>'
    };
    const rawSvg = icons[name];
    return rawSvg ? this.sanitizer.bypassSecurityTrustHtml(rawSvg) : '';
  });

  /** @ignore */
  protected handleClick(event: Event) {
    if (!this.disabled() && !this.loading()) {
      this.onClick.emit(event);
    }
  }
}
