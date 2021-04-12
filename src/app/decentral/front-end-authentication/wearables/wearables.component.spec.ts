import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WearablesComponent } from './wearables.component';

describe('WearablesComponent', () => {
  let component: WearablesComponent;
  let fixture: ComponentFixture<WearablesComponent>;

  beforeEach(async(() => {
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
