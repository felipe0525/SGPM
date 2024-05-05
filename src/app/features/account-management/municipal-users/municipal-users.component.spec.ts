import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalUsersComponent } from './municipal-users.component';

describe('MunicipalUsersComponent', () => {
  let component: MunicipalUsersComponent;
  let fixture: ComponentFixture<MunicipalUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MunicipalUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MunicipalUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
