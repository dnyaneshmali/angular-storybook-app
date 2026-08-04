import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import { UiComponents } from './ui-components';

describe('UiComponents', () => {
  let component: UiComponents;
  let fixture: ComponentFixture<UiComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(UiComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
