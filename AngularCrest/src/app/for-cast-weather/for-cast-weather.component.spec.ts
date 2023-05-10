import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForCastWeatherComponent } from './for-cast-weather.component';

describe('ForCastWeatherComponent', () => {
  let component: ForCastWeatherComponent;
  let fixture: ComponentFixture<ForCastWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForCastWeatherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForCastWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
