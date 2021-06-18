import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketIconComponent } from './market-icon.component';

describe('MarketIconComponent', () => {
  let component: MarketIconComponent;
  let fixture: ComponentFixture<MarketIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
