import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinitialiserMpComponent } from './reinitialiser-mp.component';

describe('ReinitialiserMpComponent', () => {
  let component: ReinitialiserMpComponent;
  let fixture: ComponentFixture<ReinitialiserMpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReinitialiserMpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReinitialiserMpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
