import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ColorToken {
  name: string;
  variable: string;
  class: string;
  hex: string;
  description: string;
}

@Component({
  selector: 'storybook-colors',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 font-sans">
      <div class="mb-8">
        <h1 class="text-3xl font-bold font-heading text-slate-900 dark:text-white mb-2">Color Palette</h1>
        <p class="text-slate-600 dark:text-slate-400">Click on any card to copy its CSS Variable name or Hex code.</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        @for (color of colors(); track color.variable) {
          <div 
            class="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow transition-all duration-200 cursor-pointer overflow-hidden group"
            (click)="copyToClipboard(color.variable, $event)"
          >
            <!-- Color Block -->
            <div 
              class="h-16 w-full transition-transform duration-200 group-hover:scale-[1.02]"
              [style.backgroundColor]="color.hex"
            ></div>

            <!-- Details -->
            <div class="p-2.5">
              <div class="mb-2">
                <h3 class="font-bold text-slate-800 dark:text-white text-xs truncate" [title]="color.name">{{ color.name }}</h3>
              </div>
              
              <div class="space-y-1.5 text-[10px]">
                <div class="flex flex-col text-slate-500 dark:text-slate-400">
                  <span class="text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">Variable</span>
                  <code class="font-mono text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 px-1 py-0.5 rounded truncate" [title]="color.variable">{{ color.variable }}</code>
                </div>
                <div class="flex justify-between items-center text-slate-500 dark:text-slate-400">
                  <span class="text-[9px] text-slate-400 uppercase tracking-wider">Hex</span>
                  <button 
                    type="button" 
                    class="font-mono text-brand-primary hover:underline font-semibold"
                    (click)="copyToClipboard(color.hex, $event)"
                  >
                    {{ color.hex }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Toast Notification -->
      @if (copiedText()) {
        <div 
          class="fixed bottom-6 right-6 bg-slate-900 text-white text-sm font-semibold px-4.5 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-bounce transition-all duration-300"
        >
          <svg class="w-4.5 h-4.5 text-green-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Copied: <code class="font-mono bg-slate-800 px-1 rounded">{{ copiedText() }}</code></span>
        </div>
      }
    </div>
  `
})
export class ColorsComponent {
  colors = signal<ColorToken[]>([
    {
      name: 'Brand Primary',
      variable: '--color-brand-primary',
      class: 'bg-brand-primary',
      hex: '#00569d',
      description: 'Main corporate ocean blue.'
    },
    {
      name: 'Brand Primary Hover',
      variable: '--color-brand-primary-hover',
      class: 'bg-brand-primary-hover',
      hex: '#004075',
      description: 'Used for hover state on primary brand components.'
    },
    {
      name: 'Brand Primary Light',
      variable: '--color-brand-primary-light',
      class: 'bg-brand-primary-light',
      hex: '#e6f0fa',
      description: 'Soft tint light blue background.'
    },
    {
      name: 'Brand Secondary',
      variable: '--color-brand-secondary',
      class: 'bg-brand-secondary',
      hex: '#0f172a',
      description: 'Slate dark layout color.'
    },
    {
      name: 'Brand Secondary Hover',
      variable: '--color-brand-secondary-hover',
      class: 'bg-brand-secondary-hover',
      hex: '#1e293b',
      description: 'Secondary component hover color.'
    },
    {
      name: 'Brand Secondary Muted',
      variable: '--color-brand-secondary-muted',
      class: 'bg-brand-secondary-muted',
      hex: '#64748b',
      description: 'Slate gray text and secondary elements.'
    },
    {
      name: 'Brand Secondary Border',
      variable: '--color-brand-secondary-border',
      class: 'bg-brand-secondary-border',
      hex: '#e2e8f0',
      description: 'Slate light divider lines and borders.'
    },
    {
      name: 'Brand Accent',
      variable: '--color-brand-accent',
      class: 'bg-brand-accent',
      hex: '#ff4785',
      description: 'Highlight hot pink accent.'
    }
  ]);

  copiedText = signal<string | null>(null);

  copyToClipboard(text: string, event: Event) {
    event.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      this.copiedText.set(text);
      setTimeout(() => {
        if (this.copiedText() === text) {
          this.copiedText.set(null);
        }
      }, 2000);
    });
  }
}
