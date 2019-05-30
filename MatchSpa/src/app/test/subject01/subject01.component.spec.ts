import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Subject01Component } from './subject01.component';

describe('Subject01Component', () => {
  let component: Subject01Component;
  let fixture: ComponentFixture<Subject01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Subject01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Subject01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
