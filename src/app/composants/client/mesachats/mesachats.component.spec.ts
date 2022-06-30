import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesachatsComponent } from './mesachats.component';

describe('MesachatsComponent', () => {
  let component: MesachatsComponent;
  let fixture: ComponentFixture<MesachatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesachatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesachatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
