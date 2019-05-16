import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMatchListComponent } from './user-match-list.component';

describe('UserMatchListComponent', () => {
  let component: UserMatchListComponent;
  let fixture: ComponentFixture<UserMatchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMatchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
