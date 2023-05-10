import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTodoComponent } from './get-todo.component';

describe('GetTodoComponent', () => {
  let component: GetTodoComponent;
  let fixture: ComponentFixture<GetTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
