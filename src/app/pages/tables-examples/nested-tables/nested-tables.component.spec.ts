import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedTablesComponent } from './nested-tables.component';

describe('NestedTablesComponent', () => {
  let component: NestedTablesComponent;
  let fixture: ComponentFixture<NestedTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NestedTablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NestedTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
