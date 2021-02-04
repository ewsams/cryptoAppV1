import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LandSelectedComponent } from './land-selected.component';

describe('LandSelectedComponent', () => {
  let component: LandSelectedComponent;
  let fixture: ComponentFixture<LandSelectedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LandSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
