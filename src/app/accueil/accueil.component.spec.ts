import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilComponentApp } from './accueil.component';

describe('AccueilComponentApp', () => {
  let component: AccueilComponentApp;
  let fixture: ComponentFixture<AccueilComponentApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccueilComponentApp]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilComponentApp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
