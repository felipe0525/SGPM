import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMunicipalComponent } from './table-municipal.component';

describe('TableMunicipalComponent', () => {
  let component: TableMunicipalComponent;
  let fixture: ComponentFixture<TableMunicipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableMunicipalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableMunicipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
