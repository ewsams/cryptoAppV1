import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeLoggedInComponent } from './home-logged-in.component';

describe('HomeLoggedInComponent', () => {
  let component: HomeLoggedInComponent;
  let fixture: ComponentFixture<HomeLoggedInComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLoggedInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
