import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MescommandeComponent } from './mescommande.component';

describe('MescommandeComponent', () => {
  let component: MescommandeComponent;
  let fixture: ComponentFixture<MescommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MescommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MescommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
