import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveWithoutTemplateComponent } from './reactive-without-template.component';

describe('FormValidationComponent', () => {
  let component: ReactiveWithoutTemplateComponent;
  let fixture: ComponentFixture<ReactiveWithoutTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveWithoutTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveWithoutTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
