import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandSelectedComponent } from './land-selected.component';

describe('LandSelectedComponent', () => {
  let component: LandSelectedComponent;
  let fixture: ComponentFixture<LandSelectedComponent>;

  beforeEach(async(() => {
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
