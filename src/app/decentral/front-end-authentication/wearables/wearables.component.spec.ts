import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WearablesComponent } from './wearables.component';

describe('WearablesComponent', () => {
  let component: WearablesComponent;
  let fixture: ComponentFixture<WearablesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WearablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WearablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
