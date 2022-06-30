import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilAppComponent } from './accueil-app.component';

describe('AccueilAppComponent', () => {
  let component: AccueilAppComponent;
  let fixture: ComponentFixture<AccueilAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
