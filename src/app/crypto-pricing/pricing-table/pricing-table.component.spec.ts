import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PricingTableComponent } from './pricing-table.component';

describe('PricingTableComponent', () => {
  let component: PricingTableComponent;
  let fixture: ComponentFixture<PricingTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
