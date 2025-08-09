import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveWithTemplateComponent } from './reactive-with-template.component';

describe('ReactiveWithTemplateComponent', () => {
  let component: ReactiveWithTemplateComponent;
  let fixture: ComponentFixture<ReactiveWithTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveWithTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveWithTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
