import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NftMarketComponent } from './nft-market.component';

describe('NftMarketComponent', () => {
  let component: NftMarketComponent;
  let fixture: ComponentFixture<NftMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NftMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NftMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
