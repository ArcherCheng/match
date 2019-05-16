import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMatchConditionComponent } from './user-match-condition.component';

describe('UserMatchConditionComponent', () => {
  let component: UserMatchConditionComponent;
  let fixture: ComponentFixture<UserMatchConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMatchConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMatchConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
