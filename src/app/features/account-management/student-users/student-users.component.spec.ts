import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUsersComponent } from './student-users.component';

describe('StudentUsersComponent', () => {
  let component: StudentUsersComponent;
  let fixture: ComponentFixture<StudentUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
