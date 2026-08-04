import { Component, input, output, computed, ViewEncapsulation } from '@angular/core';
import { SpinnerComponent } from './spinner.component';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'storybook-loader',
  standalone: true,
  imports: [SpinnerComponent, ButtonComponent],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoaderComponent {
  active = input<boolean>(true);
  mode = input<'fullscreen' | 'overlay' | 'inline'>('fullscreen');
  title = input<string>('Processing API Request');
  subtitle = input<string>('Please wait while we process your request. Do not refresh this page.');
  spinnerType = input<'spinner' | 'dots' | 'bars' | 'ring'>('ring');
  spinnerColor = input<'primary' | 'secondary' | 'white' | 'accent' | 'success'>('primary');
  theme = input<'glass' | 'light' | 'dark'>('glass');
  cancelable = input<boolean>(false);
  cancelButtonLabel = input<string>('Cancel Request');
  progress = input<number>(); // 0 to 100 percentage

  cancelled = output<Event>();

  /** @ignore */
  protected readonly backdropClass = computed(() => {
    const isFullscreen = this.mode() === 'fullscreen';
    const isOverlay = this.mode() === 'overlay';

    const layoutClass = isFullscreen
      ? 'fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6 transition-all duration-300 pointer-events-auto select-none'
      : isOverlay
      ? 'absolute inset-0 z-40 flex flex-col items-center justify-center p-6 transition-all duration-300 pointer-events-auto select-none rounded-2xl'
      : 'flex flex-col items-center justify-center p-6 select-none';

    const themeMap = {
      glass: isInline(this.mode()) ? 'text-slate-800' : 'bg-slate-900/80 backdrop-blur-md text-white',
      light: isInline(this.mode()) ? 'text-slate-800' : 'bg-white/95 text-slate-800',
      dark: isInline(this.mode()) ? 'text-white' : 'bg-slate-950/95 text-white',
    };

    return `${layoutClass} ${themeMap[this.theme()] || themeMap.glass}`;
  });

  /** @ignore */
  protected readonly boundedProgress = computed(() => {
    const value = this.progress();
    if (value === undefined || value === null) return null;
    return Math.min(100, Math.max(0, value));
  });

  /** @ignore */
  protected handleCancel(event: Event) {
    this.cancelled.emit(event);
  }
}

function isInline(mode: string): boolean {
  return mode === 'inline';
}
