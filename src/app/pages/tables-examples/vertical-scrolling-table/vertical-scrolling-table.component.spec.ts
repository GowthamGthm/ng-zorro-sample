import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalScrollingTableComponent } from './vertical-scrolling-table.component';

describe('VerticalScrollingTableComponent', () => {
  let component: VerticalScrollingTableComponent;
  let fixture: ComponentFixture<VerticalScrollingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalScrollingTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalScrollingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
