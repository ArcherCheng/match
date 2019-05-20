import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMessagesAlertComponent } from './my-messages-alert.component';

describe('MyMessagesAlertComponent', () => {
  let component: MyMessagesAlertComponent;
  let fixture: ComponentFixture<MyMessagesAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMessagesAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMessagesAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
