import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WearableSelectedComponent } from './wearable-selected.component';

describe('WearableSelectedComponent', () => {
  let component: WearableSelectedComponent;
  let fixture: ComponentFixture<WearableSelectedComponent>;

  beforeEach(async(() => {
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
