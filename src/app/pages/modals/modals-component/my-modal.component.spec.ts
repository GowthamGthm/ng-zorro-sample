import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsComponentComponent } from './my-modal.component';

describe('ModalsComponentComponent', () => {
  let component: ModalsComponentComponent;
  let fixture: ComponentFixture<ModalsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
