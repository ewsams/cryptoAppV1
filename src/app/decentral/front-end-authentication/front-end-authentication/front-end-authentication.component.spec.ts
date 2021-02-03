import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndAuthenticationComponent } from './front-end-authentication.component';

describe('FrontEndAuthenticationComponent', () => {
  let component: FrontEndAuthenticationComponent;
  let fixture: ComponentFixture<FrontEndAuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontEndAuthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontEndAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
