import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMessagesThreadComponent } from './my-messages-thread.component';

describe('MyMessagesThreadComponent', () => {
  let component: MyMessagesThreadComponent;
  let fixture: ComponentFixture<MyMessagesThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMessagesThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMessagesThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
