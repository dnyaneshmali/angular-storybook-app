import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });

  describe('Content & Text Rendering', () => {
    it('should render title, subtitle, and description', () => {
      fixture.componentRef.setInput('title', 'Test Card Title');
      fixture.componentRef.setInput('subtitle', 'Test Subtitle');
      fixture.componentRef.setInput('description', 'Test Description Content');
      fixture.detectChanges();

      const cardEl = fixture.nativeElement as HTMLElement;
      expect(cardEl.textContent).toContain('Test Card Title');
      expect(cardEl.textContent).toContain('Test Subtitle');
      expect(cardEl.textContent).toContain('Test Description Content');
    });

    it('should render badge tag when provided', () => {
      fixture.componentRef.setInput('badge', 'FEATURED');
      fixture.detectChanges();

      const cardEl = fixture.nativeElement as HTMLElement;
      expect(cardEl.textContent).toContain('FEATURED');
    });
  });

  describe('Dimensions & Variants', () => {
    it('should apply custom width and height inline styles', () => {
      fixture.componentRef.setInput('width', '450px');
      fixture.componentRef.setInput('height', '300px');
      fixture.detectChanges();

      const cardElement = fixture.nativeElement.firstElementChild as HTMLElement;
      expect(cardElement.style.width).toBe('450px');
      expect(cardElement.style.height).toBe('300px');
    });

    it('should apply correct variant classes', () => {
      const cardElement = fixture.nativeElement.firstElementChild as HTMLElement;

      // Default (elevated)
      expect(cardElement.className).toContain('shadow-md');

      // Outlined
      fixture.componentRef.setInput('variant', 'outlined');
      fixture.detectChanges();
      expect(cardElement.className).toContain('border-2');

      // Flat
      fixture.componentRef.setInput('variant', 'flat');
      fixture.detectChanges();
      expect(cardElement.className).toContain('bg-slate-50');
    });
  });

  describe('Buttons & Actions', () => {
    it('should NOT render action buttons when button labels are not provided', () => {
      const buttons = fixture.nativeElement.querySelectorAll('storybook-button');
      expect(buttons.length).toBe(0);
    });

    it('should render primary and secondary buttons when labels are provided', () => {
      fixture.componentRef.setInput('primaryButtonLabel', 'Save');
      fixture.componentRef.setInput('secondaryButtonLabel', 'Cancel');
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('storybook-button');
      expect(buttons.length).toBe(2);
    });

    it('should emit primaryAction output event when primary button is clicked', () => {
      fixture.componentRef.setInput('primaryButtonLabel', 'Confirm');
      fixture.detectChanges();

      const primarySpy = vi.fn();
      component.primaryAction.subscribe(primarySpy);

      const buttonNativeEl = fixture.nativeElement.querySelector('storybook-button button') as HTMLButtonElement;
      buttonNativeEl.click();

      expect(primarySpy).toHaveBeenCalledTimes(1);
    });

    it('should emit secondaryAction output event when secondary button is clicked', () => {
      fixture.componentRef.setInput('secondaryButtonLabel', 'Cancel');
      fixture.detectChanges();

      const secondarySpy = vi.fn();
      component.secondaryAction.subscribe(secondarySpy);

      const buttonNativeEl = fixture.nativeElement.querySelector('storybook-button button') as HTMLButtonElement;
      buttonNativeEl.click();

      expect(secondarySpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Loading State', () => {
    it('should render loading skeleton when loading is true', () => {
      fixture.componentRef.setInput('title', 'Card Title');
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const skeleton = fixture.nativeElement.querySelector('.animate-pulse');
      expect(skeleton).toBeTruthy();

      const cardEl = fixture.nativeElement as HTMLElement;
      expect(cardEl.textContent).not.toContain('Card Title');
    });
  });
});
