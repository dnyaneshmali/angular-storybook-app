import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });

  describe('Visibility & Accessibility', () => {
    it('should render overlay dialog when active is true', () => {
      fixture.componentRef.setInput('active', true);
      fixture.detectChanges();

      const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
      expect(dialog).toBeTruthy();
      expect(dialog.getAttribute('aria-modal')).toBe('true');
    });

    it('should NOT render overlay when active is false', () => {
      fixture.componentRef.setInput('active', false);
      fixture.detectChanges();

      const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
      expect(dialog).toBeNull();
    });

    it('should render content directly over backdrop without a card container box', () => {
      fixture.componentRef.setInput('active', true);
      fixture.detectChanges();

      const loaderContent = fixture.nativeElement.querySelector('.loader-content');
      expect(loaderContent).toBeTruthy();
      expect(loaderContent.classList.contains('bg-white')).toBe(false);
      expect(loaderContent.classList.contains('shadow-2xl')).toBe(false);
    });
  });

  describe('Text & Progress Bar', () => {
    it('should render title and subtitle', () => {
      fixture.componentRef.setInput('title', 'Uploading API Specs');
      fixture.componentRef.setInput('subtitle', 'Syncing files with cloud storage');
      fixture.detectChanges();

      const content = fixture.nativeElement.textContent;
      expect(content).toContain('Uploading API Specs');
      expect(content).toContain('Syncing files with cloud storage');
    });

    it('should render progress percentage bar when progress is provided', () => {
      fixture.componentRef.setInput('progress', 72);
      fixture.detectChanges();

      const content = fixture.nativeElement.textContent;
      expect(content).toContain('72%');

      const progressBar = fixture.nativeElement.querySelector('[style*="width: 72%"]');
      expect(progressBar).toBeTruthy();
    });
  });

  describe('Cancel Actions & Output Signals', () => {
    it('should NOT render cancel button when cancelable is false', () => {
      fixture.componentRef.setInput('cancelable', false);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('storybook-button');
      expect(button).toBeNull();
    });

    it('should render cancel button and emit cancelled output signal when clicked', () => {
      fixture.componentRef.setInput('cancelable', true);
      fixture.componentRef.setInput('cancelButtonLabel', 'Stop Upload');
      fixture.detectChanges();

      const cancelSpy = vi.fn();
      component.cancelled.subscribe(cancelSpy);

      const button = fixture.nativeElement.querySelector('storybook-button button') as HTMLButtonElement;
      expect(button).toBeTruthy();
      button.click();

      expect(cancelSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Theme Variants', () => {
    it('should apply correct theme classes for glass, light, and dark themes', () => {
      // Glass (default)
      const container = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
      expect(container.className).toContain('backdrop-blur-md');

      // Light
      fixture.componentRef.setInput('theme', 'light');
      fixture.detectChanges();
      expect(container.className).toContain('bg-white/95');

      // Dark
      fixture.componentRef.setInput('theme', 'dark');
      fixture.detectChanges();
      expect(container.className).toContain('bg-slate-950/95');
    });
  });
});
