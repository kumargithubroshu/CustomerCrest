import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateBMIComponent } from './calculate-bmi.component';

describe('CalculateBMIComponent', () => {
  let component: CalculateBMIComponent;
  let fixture: ComponentFixture<CalculateBMIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateBMIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculateBMIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
