import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect } from 'vitest';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });

  describe('Accessibility Attributes', () => {
    it('should have role="status" and aria-live="polite" for screen readers', () => {
      const container = fixture.nativeElement.querySelector('[role="status"]');
      expect(container).toBeTruthy();
      expect(container.getAttribute('aria-live')).toBe('polite');
    });
  });

  describe('Text Label & Subtext', () => {
    it('should render label and subtext when specified', () => {
      fixture.componentRef.setInput('label', 'Loading API Response...');
      fixture.componentRef.setInput('subtext', 'Please wait');
      fixture.detectChanges();

      const textContent = fixture.nativeElement.textContent;
      expect(textContent).toContain('Loading API Response...');
      expect(textContent).toContain('Please wait');
    });
  });

  describe('Variants & Types', () => {
    it('should render default spinner variant', () => {
      const spinner = fixture.nativeElement.querySelector('.animate-spin');
      expect(spinner).toBeTruthy();
    });

    it('should render dots variant when type is "dots"', () => {
      fixture.componentRef.setInput('type', 'dots');
      fixture.detectChanges();

      const dots = fixture.nativeElement.querySelectorAll('.spinner-dot-1, .spinner-dot-2, .spinner-dot-3');
      expect(dots.length).toBe(3);
    });

    it('should render wave bars variant when type is "bars"', () => {
      fixture.componentRef.setInput('type', 'bars');
      fixture.detectChanges();

      const bars = fixture.nativeElement.querySelectorAll('.spinner-bar-1, .spinner-bar-2, .spinner-bar-3, .spinner-bar-4');
      expect(bars.length).toBe(4);
    });

    it('should render dual ring variant when type is "ring"', () => {
      fixture.componentRef.setInput('type', 'ring');
      fixture.detectChanges();

      const svg = fixture.nativeElement.querySelector('svg');
      expect(svg).toBeTruthy();
    });
  });
});
