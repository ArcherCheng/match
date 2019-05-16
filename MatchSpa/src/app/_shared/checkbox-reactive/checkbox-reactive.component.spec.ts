import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxReactiveComponent } from './checkbox-reactive.component';

describe('CheckboxReactiveComponent', () => {
  let component: CheckboxReactiveComponent;
  let fixture: ComponentFixture<CheckboxReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxReactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
