import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLikersComponent } from './my-likers.component';

describe('MyLikersComponent', () => {
  let component: MyLikersComponent;
  let fixture: ComponentFixture<MyLikersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLikersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLikersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
