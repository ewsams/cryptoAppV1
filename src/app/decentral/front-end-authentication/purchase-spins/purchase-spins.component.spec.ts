import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseSpinsComponent } from './purchase-spins.component';

describe('PurchaseSpinsComponent', () => {
  let component: PurchaseSpinsComponent;
  let fixture: ComponentFixture<PurchaseSpinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseSpinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseSpinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
