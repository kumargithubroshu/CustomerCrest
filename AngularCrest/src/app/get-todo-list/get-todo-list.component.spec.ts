import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTodoListComponent } from './get-todo-list.component';

describe('GetTodoListComponent', () => {
  let component: GetTodoListComponent;
  let fixture: ComponentFixture<GetTodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTodoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
