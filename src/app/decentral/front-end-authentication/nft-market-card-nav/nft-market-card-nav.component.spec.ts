import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NftMarketCardNavComponent } from './nft-market-card-nav.component';

describe('NftMarketCardNavComponent', () => {
  let component: NftMarketCardNavComponent;
  let fixture: ComponentFixture<NftMarketCardNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NftMarketCardNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NftMarketCardNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
