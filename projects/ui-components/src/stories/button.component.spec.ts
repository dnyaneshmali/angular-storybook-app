import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });

  describe('Label & Text Content', () => {
    it('should display default label "Button"', () => {
      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement?.textContent?.trim()).toBe('Button');
    });

    it('should display custom label when updated', () => {
      fixture.componentRef.setInput('label', 'Click Me');
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement?.textContent?.trim()).toBe('Click Me');
    });
  });

  describe('Variants & Styling', () => {
    it('should render secondary variant by default', () => {
      const buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      expect(buttonElement.classList.contains('bg-brand-primary')).toBe(false);
      expect(buttonElement.classList.contains('border-brand-secondary-border')).toBe(true);
    });

    it('should render primary variant when primary input is true', () => {
      fixture.componentRef.setInput('primary', true);
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      expect(buttonElement.classList.contains('bg-brand-primary')).toBe(true);
    });

    it('should apply correct size styles for small, medium, and large sizes', () => {
      const buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

      // Medium (default)
      expect(buttonElement.className).toContain('px-4.5 py-2.5 text-sm');

      // Small
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      expect(buttonElement.className).toContain('px-3.5 py-2 text-xs');

      // Large
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      expect(buttonElement.className).toContain('px-6 py-3 text-base');
    });

    it('should apply custom background color when specified', () => {
      fixture.componentRef.setInput('backgroundColor', 'rgb(255, 0, 0)');
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      expect(buttonElement.style.backgroundColor).toBe('rgb(255, 0, 0)');
    });
  });

  describe('User Interactions & Output Signals', () => {
    it('should emit onClick output event when button is clicked', () => {
      const clickSpy = vi.fn();
      component.onClick.subscribe(clickSpy);

      const buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      buttonElement.click();

      expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    it('should be disabled and NOT emit onClick when disabled is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const clickSpy = vi.fn();
      component.onClick.subscribe(clickSpy);

      const buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      expect(buttonElement.disabled).toBe(true);

      buttonElement.click();
      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('State Handling (Loading & Icons)', () => {
    it('should show loading spinner and disable button when loading is true', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      expect(buttonElement.disabled).toBe(true);

      const spinner = fixture.nativeElement.querySelector('.animate-spin');
      expect(spinner).toBeTruthy();
    });

    it('should NOT emit onClick when clicked while loading', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const clickSpy = vi.fn();
      component.onClick.subscribe(clickSpy);

      const buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      buttonElement.click();

      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('should render icon SVG when valid icon name is provided', () => {
      fixture.componentRef.setInput('icon', 'search');
      fixture.detectChanges();

      const svgElement = fixture.nativeElement.querySelector('svg');
      expect(svgElement).toBeTruthy();
    });

    it('should hide icon SVG when loading is true even if icon is specified', () => {
      fixture.componentRef.setInput('icon', 'search');
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const svgElement = fixture.nativeElement.querySelector('svg');
      expect(svgElement).toBeNull();

      const spinner = fixture.nativeElement.querySelector('.animate-spin');
      expect(spinner).toBeTruthy();
    });
  });
});
