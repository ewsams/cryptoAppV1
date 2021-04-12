import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandAvailableComponent } from './land-available.component';

describe('LandAvailableComponent', () => {
  let component: LandAvailableComponent;
  let fixture: ComponentFixture<LandAvailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandAvailableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
