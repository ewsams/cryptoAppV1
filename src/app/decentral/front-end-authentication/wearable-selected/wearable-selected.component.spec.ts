import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WearableSelectedComponent } from './wearable-selected.component';

describe('WearableSelectedComponent', () => {
  let component: WearableSelectedComponent;
  let fixture: ComponentFixture<WearableSelectedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WearableSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WearableSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
